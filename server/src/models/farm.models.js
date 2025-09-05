import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const farmShcema = new Schema(
    {
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        name : {
            type: String,
            required: true,
        },
        type: {
            type: String,
            enum: ['pig', 'poultry'],
            required: true,
        },
        size: {
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

farmShcema.plugin(mongooseAggregatePaginate);

export const Farm = mongoose.model("Farm", farmShcema);