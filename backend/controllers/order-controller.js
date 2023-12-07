import { catchAsyncError } from "../middleware/catchAsyncError.js";
import { Order } from "../models/order.js";
import { ErrorHandler } from "../utils/ErrorHandler.js";

export const placeOrder = catchAsyncError(async(req, res, next)=>{

    const { billingInfo, orderItems, paymentInfo} = req.body;

    // const {firstName,
    // lastName,
    // companyName,
    // streetAddress,
    // country,
    // state,
    // zipCode,
    // email,
    // phoneNumber,
    // orderNotes} = billingInfo;

    //Send Error if Empty
    const errorObj = {};
    const arraysOfKeys = Object.keys(billingInfo);
    arraysOfKeys.map((i)=>{
        if(billingInfo[i] === '' && i!= 'companyName' && i!= 'orderNotes'){
            errorObj[i] = `${i} is Empty`;
        }
    })


    //Throw error!
    if(Object.keys(errorObj).length !==0){
        return res.status(400).json({
            errorObj
        })
    }

    //Create Order!
    const order = await Order.create({...req.body, orderedBy: req.user.id});


    res.status(201).json({
        success: true,
        order
    })
})

export const getMyOrders = catchAsyncError(async(req, res, next)=>{

    const orders = await Order.find({orderedBy: req.user.id});

    res.status(200).json({
        orders
    })

})

export const getSingleOrder = catchAsyncError(async(req, res, next)=>{

    const getSingleOrder = await Order.findById(req.params.id)

    res.status(200).json({
        getSingleOrder
    })
})