import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Report } from "../models/report.models.js";
import { Farm } from "../models/farm.models.js";
import {Types} from "mongoose";

// all reports of specific farms with pagination
const getAllReports = asyncHandler(async (req, res) => {
    const { page, limit } = req.query;
    const farmId = req.params.id;

    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 3;

    const reports = await Report.aggregatePaginate(
        Report.aggregate([
            { $match: { farm: new Types.ObjectId(farmId) } },
        ]),
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
    const { id, rid } = req.params;
    const report = await Report.findOne({
        _id: rid,
        farm: id,
    }).populate("farm");

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

    const imgRes = await uploadOnCloudinary(symptomsImgLocalPath);
    const imageUrl = imgRes?.secure_url;

    const aiResult = {
        disease: "Avian Influenza",
        confidence: 0.92,
        recommendations: ["Isolate sick animals", "Call vet"],
    };

    const report = await Report.create({
        farm: farmId,
        imageUrl,
        aiResult,
    });

    return res
        .status(201)
        .json(new ApiResponse(201, report, "Report created successfully"));
});

// update status (done by admin / vet)
const updateReport = asyncHandler(async (req, res) => {
    const { id, rid } = req.params;
    
    if (!["vet", "admin"].includes(req.user.role)) throw new ApiError(403, "Only vet/admin can update report")

    const { status } = req.query;

    const report = await Report.findOne({
        _id: rid,
        farm: id,
    });

    if (!report) throw new ApiError(404, "Report not found for this farm");

    report.status = status || report.status;
    await report.save();

    return res
        .status(200)
        .json(new ApiResponse(200, report, "Report updated successfully"));
});

export { getAllReports, getReportById, createReport, updateReport };
