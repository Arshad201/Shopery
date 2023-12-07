import { Schema, model } from "mongoose";

const productSchema = Schema({
    name: {
        type: String,
        required: [true, "Please Enter product Name"],
        trim: true,
    },
    shortDesc: {
        type: String,
        required: [true, "Please Enter product Description"],
    },
    longDesc: {
       para1:{type: String, required: [true, "Please Enter product Description"]},
       para2:{type: String},
       longDescList:[{type: String}],
       para3:{type: String},
    },
    price: {
        type: Number,
        required: [true, "Please Enter product Price"],
        maxLength: [8, "Price cannot exceed 8 characters"],
    }
    ,
    images: [
        {
        public_id: {
            type: String,
            default: "sample_id"
            // required: true,
        },
        url: {
            type: String,
            default: "sample_url"
            // required: true,
        },
        },
    ],
    additionalInfo:{
        weight:{type: Number, required: [true, "Please Enter Product Weight"]},
        color:{type: String, required: [true, "Please Enter Product Color"]},
        type:{type: String, default: 'Organic'},
        category: {
            type: String,
            default: "others",
        },
        stock: {
            type: Number,
            required: [true, "Please Enter product Stock"],
            maxLength: [4, "Stock cannot exceed 4 characters"],
            default: 1,
        },
        tags:[
            {
                type:String
            }
        ],
        discount:{
            type: Number
        }
    },
    ratings: {
        type: Number,
        default: 0,
    },
    reviews: [
        {
            user: {
                type: Schema.ObjectId,
                ref: "User",
                required: true,
            },
            rating: {
                type: Number,
                required: true,
            },
            comment: {
                type: String,
                required: true,
            },
            commentDate:{
                type: Date,
                default: Date.now,
            }
        },
    ],
    productAdmin: {
        type: Schema.ObjectId,
        ref: "User",
        required: true,
    },
    featured: {type:Boolean, default: false}
    ,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export const Product = model("Product", productSchema); 