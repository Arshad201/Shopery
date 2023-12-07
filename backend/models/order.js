import { Schema, model } from "mongoose";

const OrderSchema = new Schema({
    billingInfo:{
        firstName:{
            type: String,
            required: true
        },
        lastName:{
            type: String,
            required: true
        },
        companyName:{
            type: String,
        },
        streetAddress:{
            type: String,
            required: true
        },
        country:{
            type: String,
            required: true
        },
        state:{
            type: String,
            required: true
        },
        zipCode:{
            type: Number,
            required: true
        },
        email:{
            type: String,
            required: true
        },
        phoneNumber:{
            type: Number,
            required: true
        },
        orderNotes:{
            type: String
        },
    },
    orderItems:[
        {
            productId:{
                type: Schema.ObjectId,
                ref: "Product",
                required: true,
            },
            name:{
                type: String,
                required: true
            },
            image:{
                type: String,
                required: true
            },
            quantity:{
                type: Number,
                required: true
            },
            price:{
                type: Number,
                required: true
            },
        }
    ],
    paymentInfo:{
        taxPrice:{
            type: Number,
            required: true
        },
        shippingPrice:{
            type: Number,
            required: true
        },
        totalPrice:{
            type: Number,
            required: true
        },
        paymentType:{
            type: String,
            required: true
        },
        paymentStatus:{
            type: String,
            required: true,
            default: 'Pending'
        },
        transactionId:{
            type: String,
        }
    },
    orderStatus:{
        type: String,
        required: true,
        default: "Order received"
    },
    orderedBy:{
        type: Schema.ObjectId,
        ref: "User",
        required: true,
    },
    orderDate:{
        type: Date,
        default: Date.now
    }
});

export const Order = model('Order', OrderSchema);