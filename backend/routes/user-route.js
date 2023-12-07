import express from "express";
export const userRoute = express.Router();
import { accountSetting, billingSetting, changePassword, loadMyProfile, login, logout, newsletter, register } from "../controllers/user-controller.js";
import { isAuthenticatedUser } from "../middleware/Auth.js";

userRoute.post('/register', register);
userRoute.post('/login', login);
userRoute.post('/logout',isAuthenticatedUser, logout);
userRoute.get('/getmyprofile', isAuthenticatedUser, loadMyProfile);
userRoute.post('/account/setting', isAuthenticatedUser, accountSetting);
userRoute.post('/setting/billing', isAuthenticatedUser, billingSetting);
userRoute.post('/change/password', isAuthenticatedUser, changePassword);
userRoute.post('/submit/newsletter', newsletter);

