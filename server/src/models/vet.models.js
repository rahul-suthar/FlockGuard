import mongoose, { Schema } from "mongoose";

const vetSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref : "User",
        },
        specialization: [String],
        clinicAddress: String,
        licenseNo: String,
        available: Boolean,
    },
    { timestamps: true }
);

export const Vet = mongoose.model("Vet", vetSchema);
