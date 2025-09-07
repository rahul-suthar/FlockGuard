import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { mlResponse } from "../utils/mlRespose.js";
import { Report } from "../models/report.models.js";
import { Types } from "mongoose";
import { Farm } from "../models/farm.models.js";

const allowedTransitions = {
    new: ["vet_review"],
    vet_review: ["pharmacy_requested"],
    pharmacy_requested: ["closed"],
    closed: [],
};

const validTransaction = (curr, next) => {
    return allowedTransitions[curr]?.includes(next);
};

// all reports of specific farms with pagination
const getAllReports = asyncHandler(async (req, res) => {
    const { page, limit } = req.query;

    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 3;

    const role = req.user.role;
    const filter = {};

    if (role === "farmer") {
        const farmId = req.params.id;
        if (!farmId) throw new ApiError(400, "Farm ID required");

        const farm = await Farm.findOne({ _id: farmId, owner: req.user._id });
        if (!farm) throw new ApiError(403, "It's not your farm.");

        filter.farm = farm._id;
    } else if (role === "vet") {
        filter.status = "vet_review";
    } else if (role === "pharmacy") {
        filter.status = "pharmacy_requested";
    }

    const reports = await Report.aggregatePaginate(
        Report.aggregate([{ $match: filter }]),
        {
            page: pageNum,
            limit: limitNum,
        }
    );

    return res
        .status(200)
        .json(new ApiResponse(200, reports, "Reports fetched with pagination"));
});

// get one report by id
const getReportById = asyncHandler(async (req, res) => {
    const filter = { _id: req.params.rid };

    if (req.user.role === "farmer") {
        const farm = await Farm.findOne({ _id: req.params.id, owner: req.user._id });
        if (!farm) throw new ApiError(403, "Not your farm.");
        filter.farm = farm._id;
    }

    const report = await Report.findOne(filter).populate("farm");

    if (!report) throw new ApiError(404, "Report not found");

    return res
        .status(200)
        .json(new ApiResponse(200, report, "Report fetched successfully"));
});

// farm report -> (farmer uploads an image -> AI results stubbed)
const createReport = asyncHandler(async (req, res) => {
    const farmId = req.params.id;

    const symptomObj = req.files?.symptomsImg;
    if (!symptomObj) {
        throw new ApiError(400, "Image is required");
    }

    const symptomsImgLocalPath = symptomObj[0]?.path;
    const aiRes = await mlResponse(symptomsImgLocalPath);
    const imgRes = await uploadOnCloudinary(symptomsImgLocalPath);

    const report = await Report.create({
        farm: farmId,
        imageUrl: imgRes?.secure_url,
        aiResult: {
            disease: aiRes.prediction,
            confidence: Number(aiRes.confidence).toFixed(5),
            recommendations: ["Call vet", "Isolate sick animals"],
        },
        status: "new",
    });

    return res
        .status(201)
        .json(new ApiResponse(201, report, "Report created"));
});

const consultVet = asyncHandler(async (req, res)=> {
    const report = await Report.findOne({ _id: req.params.rid, farm: req.params.id })
    if (!report) throw new ApiError(404, "Report not found");

    if (!validTransaction(report.status, "vet_review")) {
        throw new ApiError(400, `Cannot move from ${report.status} -> vet_review`);
    }

    report.status = "vet_review";
    await report.save({ validateBeforeSave: false });

    return res
        .status(200)
        .json(new ApiResponse(200, report, "Sent for vet review"));
})

const vetReview = asyncHandler(async (req, res)=> {
    const {diagnosis, prescription } = req.body;
    const report = await Report.findById(req.params.rid);
    if (!report) throw new ApiError(404, "Report not found");

    if (!validTransaction(report.status, "pharmacy_requested")) {
        throw new ApiError(400, `Cannot move from ${report.status} -> pharmacy_requested`);
    }

    report.vetReview = {
        vet: req.user._id,
        diagnosis,
        prescription,
        reviewedAt: new Date(),
    };

    report.status = "pharmacy_requested";
    await report.save({ validateBeforeSave: false });

    return res
        .status(200)
        .json(new ApiResponse(200, report, "Vet review added"));
})

const pharmacyResponse = asyncHandler(async (req, res)=> {
    const { medicines, orderStatus } = req.body;
    const report = await Report.findById(req.params.rid);
    if (!report) throw new ApiError(404, "Report not found");

    if (!validTransaction(report.status, "closed") && orderStatus === "fulfilled") {
        throw new ApiError(400, `Cannot close report from ${report.status}`);
    }

    report.pharmacyResponse = {
        pharmacy: req.user._id,
        medicines,
        orderStatus,
        updatedAt: new Date(),
    }

    if (orderStatus === "fulfilled") report.status = "closed";

    await report.save({ validateBeforeSave: false });

    return res
        .status(200)
        .json(new ApiResponse(200, report, "Pharmacy response saved"));
});

const closeReport = asyncHandler(async (req, res) => {
    const report = await Report.findById(req.params.rid);
    if (!report) throw new ApiError(404, "Report not found");

    if (!validTransaction(report.status, "closed")) {
        throw new ApiError(400, `Cannot close directly from ${report.status}`);
    }

    report.status = "closed";
    await report.save();

    return res
        .status(200)
        .json(new ApiResponse(200, report, "Report closed"));
})

const deleteReport = asyncHandler(async (req, res) => {
    const filter = { _id: req.params.rid };

    if (req.user.role === "farmer") {
        filter.farm = req.params.id;
    }

    const report = await Report.findOneAndDelete(filter);

    if (!report) throw new ApiError(404, "Report not found");

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Report deleted successfully"));
});

export {
    getAllReports,
    getReportById,
    createReport,
    consultVet,
    vetReview,
    pharmacyResponse,
    closeReport,
    deleteReport,
};
