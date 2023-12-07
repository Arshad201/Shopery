import express from "express";
export const orderRoute = express.Router();
import { isAuthenticatedUser } from "../middleware/Auth.js";
import { getMyOrders, getSingleOrder, placeOrder } from "../controllers/order-controller.js";

orderRoute.post('/place/order', isAuthenticatedUser, placeOrder);
orderRoute.get('/get/myorders', isAuthenticatedUser, getMyOrders);
orderRoute.get('/get/myorders/:id', isAuthenticatedUser, getSingleOrder);