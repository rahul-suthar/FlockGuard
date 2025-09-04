import mongoose, { Schema } from "mongoose";

const pharmacySchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref : "User",
        },
        storeName: String,
        address: String,
        licenseNo: String,
        medicinesAvailable: [{
            name: String,
            stock: Number,
        }],
    },
    { timestamps: true }
);

export const Pharmacy = mongoose.model("Pharmacy", pharmacySchema);
