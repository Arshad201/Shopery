import express from "express";
export const productRoute = express.Router();
import { isAuthenticatedUser } from "../middleware/Auth.js";
import { addNewCategory, createFeedback, createProduct, deleteCategory, deleteFeedback, deleteProduct, getAllCategory, getAllProducts, getCartProducts, getSingleProduct, updateCategory, updateProduct } from "../controllers/product-controller.js";

productRoute.post('/product/new', isAuthenticatedUser, createProduct);
productRoute.get('/product/:id', getSingleProduct);
productRoute.post('/product/update/:id', isAuthenticatedUser, updateProduct);
productRoute.delete('/product/delete/:id', isAuthenticatedUser, deleteProduct);
productRoute.get('/products', getAllProducts);
productRoute.get('/cart', getCartProducts);

//Product Rating
productRoute.post('/product/feedback/create/:id', isAuthenticatedUser, createFeedback);
productRoute.delete('/product/feedback/delete/:id', isAuthenticatedUser, deleteFeedback);

//Category
productRoute.post('/new/category', isAuthenticatedUser, addNewCategory);
productRoute.get('/all/category', getAllCategory);
productRoute.post('/update/category/:id', isAuthenticatedUser, updateCategory);
productRoute.delete('/delete/category/:id', isAuthenticatedUser, deleteCategory);
