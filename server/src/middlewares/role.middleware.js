import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const authorizeRoles = (...allowedRoles) => {
    return asyncHandler(async (req, _, next) => {
        if (!allowedRoles.includes(req.user.role)){
            throw new ApiError(403, `You aren't authorized to access this resources`);
        }
        next();
    })
};
