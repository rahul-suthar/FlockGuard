import mongoose, {Schema} from "mongoose";

const alertSchema = new Schema(
    {
        disease: String,
        region: String,
        severity: {
            type: String,
            enum: ["low", "medium", "high"],
        },
        message: String,
        issuedBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true }
);