import mongoose, { Schema } from "mongoose";

const reportSchema = new Schema(
    {
        farm: {
            type: Schema.Types.ObjectId,
            ref: "Farm",
            required: true,
        },
        imageUrl: String,
        aiResult: {
            disease: String,
            confidence: Number,
            recommendations: [String],
        },
        vetReview: {
            vetId: {
                type: Schema.Types.ObjectId,
                ref: "Vet",
            },
            diagnosis: String,
            prescription: String,
            reviewedAt: Date,
        },
        pharmacyResponse: {
            pharmacyId: {
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
        status: {
            type: String,
            enum: ["new", "reviewed", "closed"],
            default: "new",
        }
    },
    { timestamps: true }
);

reportSchema.plugin(mongooseAggrigatePaginate);

export const Report = mongoose.model("Report", reportSchema);