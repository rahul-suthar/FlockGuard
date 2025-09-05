import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.models.js";
// import { uploadOnCloudinary } from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";

const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
};

const generateTokens = async (user) => {
    try {
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating tokens");
    }
};

const registerUser = asyncHandler(async (req, res) => {
    // get user data
    const { name, email, password, phone, role } = req.body;

    // data validations
    if (!phone && [name, email, password, role].some((field) => !field?.trim())) {
        throw new ApiError(400, "All fields are required");
    }

    if (!["farmer", "vet", "pharmacy", "admin"].includes(role)) {
        throw new ApiError(400, "Invalid role");
    }

    // checking user existence
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new ApiError(409, "User already exists");
    }

    // save user object in database
    const user = await User.create({
        name,
        email,
        password,
        phone,
        role,
    });

    // remove password and refresh token
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    if (!createdUser)
        throw new ApiError(500, "Something went wrong while registering user");

    // return respose , statusCode
    return res
        .status(201)
        .json(
            new ApiResponse(201, createdUser, "User registered Successfully")
        );
});

const loginUser = asyncHandler(async (req, res) => {
    // get user data
    const { phone, email, password } = req.body;

    // data validate
    if (!email && !phone) {
        throw new ApiError(400, "email or phone is required");
    }

    // checking user existence
    const user = await User.findOne({
        $or: [{ email }, { phone }],
    });

    if (!user) {
        throw new ApiError(404, "User doesn't exists");
    }

    // validate user
    const isValid = await user.isPasswordCorrect(password);
    if (!isValid) {
        throw new ApiError(401, "Invalid user Credentials");
    }

    // generate access , refresh tokens , login permission
    const { accessToken, refreshToken } = await generateTokens(user);

    const loggedUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedUser,
                    accessToken,
                    refreshToken,
                },
                "User logged In Successfully"
            )
        );
});

const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1,
            },
        },
        {
            new: true,
        }
    );

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User Logged Out"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingToken = req.cookies.refreshToken || req.body.refreshToken;

    if (!incomingToken) {
        throw new ApiError(401, "Unauthorized request");
    }

    const decodedToken = jwt.verify(
        incomingToken,
        process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id);

    if (!user || incomingToken !== user?.refreshToken) {
        throw new ApiError(401, "Invalid or expired refresh token");
    }

    const { accessToken, refreshToken } = await generateTokens(user);

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    accessToken,
                    refreshToken,
                },
                "Access token refreshed"
            )
        );
});

export { registerUser, loginUser, logoutUser, refreshAccessToken };
