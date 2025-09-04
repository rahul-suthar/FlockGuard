import mongoose, { Schema } from "mongoose";
import mongooseAggrigatePaginate from "mongoose-aggregate-paginate-v2";

const farmShcema = new Schema(
    {
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        farmType: {
            type: String,
            enum: ['pig', 'poultry'],
            required: true,
        },
        farmSize: {
            type: Number,
            required: true,
        },
        animalsCount: {
            type: Number,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

farmShcema.plugin(mongooseAggrigatePaginate);

export const Farm = mongoose.model("Farm", farmShcema);