import mongoose, { Schema } from "mongoose";
import mongooseAggrigatePaginate from "mongoose-aggregate-paginate-v2";

const reportSchema = new Schema(
    {
        farm: {
            type: Schema.Types.ObjectId,
            ref: "Farm",
            required: true,
        },
        imageUrl: {
            type: String,
            required: true,
        },
        aiResult: {
            disease: String,
            confidence: Number,
            recommendations: [String],
        },
        vetReview: [
            {
                vet: {
                    type: Schema.Types.ObjectId,
                    ref: "Vet",
                },
                diagnosis: String,
                prescription: String,
                reviewedAt: Date,
            },
        ],
        pharmacyResponse: [
            {
                pharmacy: {
                    type: Schema.Types.ObjectId,
                    ref: "Pharmacy",
                },
                medicines: [String],
                orderStatus: {
                    type: String,
                    enum: ["pending", "fulfilled"],
                },
                updatedAt: Date,
            },
        ],
        status: {
            type: String,
            enum: ["new", "vet_review", "pharmacy_requested", "closed"],
            default: "new",
        },
    },
    { timestamps: true }
);

reportSchema.plugin(mongooseAggrigatePaginate);

export const Report = mongoose.model("Report", reportSchema);
