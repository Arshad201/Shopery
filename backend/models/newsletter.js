import { Schema, model } from "mongoose";

const newsletterSchema = new Schema({
    email:{
        type: String,
        required: true,
        default: "Order received"
    },
    orderDate:{
        type: Date,
        default: Date.now
    }
});

export const Newsletter = model('Newsletter', newsletterSchema);