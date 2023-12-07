import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt';
import jwt  from "jsonwebtoken";

const userSchema = Schema({
    firstName:{
        type:String,
        minLength: [3, "Name requires atleast 3 characters"],
        maxLength: [20, "Name cannot greater than 20 characters"],
    },
    lastName:{
        type:String,
        minLength: [3, "Name requires atleast 3 characters"],
        maxLength: [20, "Name cannot greater than 20 characters"],
    },
    email:{
        type: String,
        unique: true,
        required: true
    },
    phoneNumber:{
        type: Number,
    },
    password:{
        type: String,
        required: [true, 'Password is required!'],
        minLength: [8, "Password requires minimum 8 characters"],
        select: false,
    },
    avatar: {
        public_id: {
          type: String,
          default: 'example_id'
        //   required: true,
        },
        url: {
          type: String,
          default: 'example_url'
        //   required: true,
        },
    },
    role: {
        type: String,
        default: "user",
    },
     billingInfo:{
        firstName:{
            type: String,
        },
        lastName:{
            type: String,
        },
        companyName:{
            type: String,
        },
        streetAddress:{
            type: String,
        },
        country:{
            type: String,
        },
        state:{
            type: String,
        },
        zipCode:{
            type: Number,
        },
        email:{
            type: String,
        },
        phoneNumber:{
            type: Number,
        }
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

//Generate Hash Password before save!
userSchema.pre('save', async function(next){

    if(!this.isModified('password')) next();
    this.password = await bcrypt.hash(this.password, 10);

});

//Verify Password with Hashed Password that is saved in DB
userSchema.methods.comparePass = async function(password){
    return await bcrypt.compare(password, this.password);
}

//Generate JWT Token
userSchema.methods.getJWT = function(){

    return jwt.sign({ _id : this.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE});

}

export const User =  model("User", userSchema);
