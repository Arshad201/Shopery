import { catchAsyncError } from "../middleware/catchAsyncError.js";
import { Newsletter } from "../models/newsletter.js";
import { User } from "../models/user.js";
import { ErrorHandler } from "../utils/ErrorHandler.js";
import { sendToken } from "../utils/sendToken.js";
import cloudinary from 'cloudinary';

export const register = catchAsyncError(async(req, res, next)=>{

    const { email, password, cPassword } = req.body;


    if(password !== cPassword){
        return next(new ErrorHandler(`Password & Confirm Password should be same!`, 400));
    }

    const user = await User.findOne({email});

    if(user){
        return next(new ErrorHandler(`${email} is already registered!`, 400));
    }

    const newUser = await User.create({email, password});



    sendToken(newUser, 201, res, "Account Created Successfully!");

});


export const login = catchAsyncError(async(req, res, next)=>{

    const { email, password } = req.body;

    if(!email || !password){
        return next(new ErrorHandler('Enter required Fields!', 400));
    }

    const user = await User.findOne({email}).select("+password");

    if(!user){
        return next(new ErrorHandler('Invalid Credentials', 400));
    }

    const isRightPass = await user.comparePass(password)

    if(!isRightPass){
        return next(new ErrorHandler('Invalid Credentials', 400));
    }

    sendToken(user, 201, res, "LoggedIn Successfully!");

});


export const logout = catchAsyncError(async(req, res, next)=>{

    res.status(200).clearCookie('token').json({
        success: true,
        message: "Loggedout successfully!"
    })

});

export const loadMyProfile = catchAsyncError(async(req, res, next)=>{

    const user = await User.findById(req.user.id);

    res.status(200).json({
        user
    })
});

export const accountSetting = catchAsyncError(async(req, res, next)=>{

    const {firstName, lastName, email, phoneNumber, avatar} = req.body;



    const user = await User.findById(req.user.id);
    



        if(user.avatar.public_id !== 'example_id'){

            await cloudinary.v2.uploader.destroy(user.avatar.public_id);

        }

        if(user.avatar.url !== avatar.url){

            const myCloud = await cloudinary.v2.uploader.upload(avatar.url, {
                folder: "avatars",
            });
    
            user.avatar = {
                public_id: myCloud.public_id,
                url: myCloud.url
            }
        }

    // user.avatar = {
    //     public_id: 'example_id',
    //     url: 'example_url'
    // }




    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.phoneNumber = phoneNumber;
    

    await user.save({validateBeforeSave: true});

    res.status(200).json({
        user
    })
});

export const billingSetting = catchAsyncError(async(req, res, next)=>{

    const {firstName, lastName, companyName, streetAddress, country, state, zipCode, email, phoneNumber} = req.body;

    const user = await User.findById(req.user.id);

    user.billingInfo.firstName = firstName;
    user.billingInfo.lastName = lastName;
    user.billingInfo.companyName = companyName;
    user.billingInfo.streetAddress = streetAddress;
    user.billingInfo.country = country;
    user.billingInfo.state = state;
    user.billingInfo.zipCode = zipCode;
    user.billingInfo.email = email;
    user.billingInfo.phoneNumber = phoneNumber;
    
    //skip avatar for now

    await user.save({validateBeforeSave: false});

    res.status(200).json({
        user
    })
})

export const changePassword = catchAsyncError(async(req, res, next)=>{

    const {currentPassword, password, confirmPassword} = req.body;

    if(!currentPassword || !password || !confirmPassword){

        return next(new ErrorHandler('All Fields are required!', 400));

    } 

    if(password !== confirmPassword){
        return next(new ErrorHandler('Password and Confirm Password should be same!', 400));
    }

    const user = await User.findById(req.user.id).select("password");

    const isRightPass = await user.comparePass(currentPassword);

    if(!isRightPass){
        return next(new ErrorHandler('Invalid Credentials', 400));
    }

    user.password = password;

    await user.save({validateBeforeSave: true});

    res.status(200).json({
        user
    })
});

export const newsletter = catchAsyncError(async(req, res, next)=>{

    const {email} = req.body;

    if(!email){
        return next(new ErrorHandler('Enter subscription email to join our Newsletter!', 400));
    } 

    const alreayExistEmail = await Newsletter.findOne({email});

    if(alreayExistEmail){
        return next(new ErrorHandler('This Email is already subscribed!', 400));
    } 

    const newsletter = await Newsletter.create({email});

    res.status(200).json({
        success: true,
        newsletter
    })
});
