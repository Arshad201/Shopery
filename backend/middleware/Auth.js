import jwt from "jsonwebtoken";
import { ErrorHandler } from "../utils/ErrorHandler.js";
import { catchAsyncError } from "./catchAsyncError.js";
import { User } from "../models/user.js";

export const isAuthenticatedUser = catchAsyncError( async(req, res, next) =>{

    const { token } = req.cookies;

    if(!token) return next(new ErrorHandler("Login to access this resource!", 400));

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    if(!decodedData._id) return next(new ErrorHandler("Your login session is expire, please login again to access this resource!", 400));

    const user = await User.findById(decodedData._id);

    if(!user) return next(new ErrorHandler(`User is not found for this id -> ${decodedData._id}`, 400));

    req.user = user;

    next();

});

