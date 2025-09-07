import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Farm } from "../models/farm.models.js";

// Admin / Global route
const getAllFarms = asyncHandler(async (req, res) => {
    const { page, limit } = req.query;

    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 10;

    const filter = {};
    if (req.user.role === "farmer") filter.owner = req.user._id;

    const farms = await Farm.aggregatePaginate(
        Farm.aggregate([{ $match: filter }]),
        {
            page: pageNum,
            limit: limitNum,
        }
    );

    return res
        .status(200)
        .json(new ApiResponse(200, farms, "farms fetched with pagination"));
});

// farmer-only routes

// create farm
const addFarm = asyncHandler(async (req, res) => {
    const { name, type, location, size } = req.body;

    if (!(name && type && location && size)) {
        throw new ApiError(400, "Insufficient farm details");
    }

    const existingFarm = await Farm.findOne({ name, owner: req.user._id });
    if (existingFarm) {
        throw new ApiError(
            409,
            "You already have a farm with this name. Use different name"
        );
    }

    const farm = await Farm.create({
        name,
        type,
        location,
        size,
        owner: req.user._id,
    });

    return res
        .status(201)
        .json(new ApiResponse(201, farm, "Farm created"));
});

// fetch farm details
const getFarmById = asyncHandler(async (req, res) => {
    const filter = { _id: req.params.id };

    if (req.user.role === "farmer") {
        filter.owner = req.user._id;
    }

    const farm = await Farm.findOne(filter).populate("owner", "name email");

    if (!farm) throw new ApiError(404, "Farm not found");

    if (farm.owner._id.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You are not allowed to access this farm");
    }

    return res.status(200).json(new ApiResponse(200, farm, "Farm fetched"));
});

// delete farm
const deleteFarm = asyncHandler(async (req, res) => {
    const filter = { _id: req.params.id };

    if (req.user.role === "farmer") {
        filter.owner = req.user._id;
    }

    const farm = await Farm.findOneAndDelete(filter);

    if (!farm) throw new ApiError(404, "farm not found");

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Farm deleted successfully"));
});

// update farm details
const updateFarm = asyncHandler(async (req, res) => {
    const { name, type, size, location } = req.body;

    const farm = await Farm.findOne({
        _id: req.params.id,
        owner: req.user._id,
    });

    if (!farm) throw new ApiError(404, "Farm not found");

    if (farm.owner._id.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You are not allowed to Update this farm");
    }

    if (name && farm.name !== name) {
        const existingFarm = await Farm.findOne({
            name,
            owner: req.user._id,
        });
        if (existingFarm) {
            throw new ApiError(
                409,
                "You already have farm with this name. Use different name."
            );
        }

        farm.name = name;
    }

    if (size) farm.size = size;
    if (location) farm.location = location;
    if (type) farm.type = type;

    await farm.save();

    return res
        .status(200)
        .json(new ApiResponse(200, farm, "farm updated successfully"));
});

export {
    getAllFarms,
    addFarm,
    getFarmById,
    deleteFarm,
    updateFarm,
};
