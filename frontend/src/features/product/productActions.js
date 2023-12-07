import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const API_URL = window.location.origin;

export const getProducts = createAsyncThunk('products/getAllProducts', async (queries, thunkAPI)=>{
    try {
        
        const { data } = await axios.get(`${API_URL}/api/v1/products`, { params: queries});

        if(queries.actionType === 'shopProducts'){
            return data
        }
        return data.products;

    } catch (error) {
        return thunkAPI.rejectWithValue({error: "something went wrong!"});
    }
})

export const getSingleProduct = createAsyncThunk('products/getSingleProduct', async (id, thunkAPI)=>{

    try {
        const { data } = await axios.get(`${API_URL}/api/v1/product/${id}`);
        return data.product;

    } catch (error) {
        return thunkAPI.rejectWithValue({error: "something went wrong!"});
    }
})

export const getCartProducts = createAsyncThunk('products/cartProducts', async (formal, thunkAPI)=>{

    try {
        
        const cartItems  = JSON.parse(localStorage.getItem('cart'));
        const idsOfCartItem = [];
        cartItems.map(item=>idsOfCartItem.push(item.id));

        const { data } = await axios.get(`${API_URL}/api/v1/cart`, { params: {items: idsOfCartItem}});

        const productIdsArr = []

        data.products.map(product=>{

            productIdsArr.push(product._id)

            //Add Quantity property to products
            cartItems.map((i)=>{
                if(i.id == product._id){
                    product.quantity = i.quantity;
                }
            });

        });


        //Filter id's which don't have product
        const filteredIds = cartItems.filter((i=>productIdsArr.includes(i.id)));
        //Update Cart Items after cleanup
        localStorage.setItem('cart', JSON.stringify(filteredIds));

        return data.products;

    } catch (error) {
        return thunkAPI.rejectWithValue({error: "something went wrong!"});
    }
})

export const getWishlistProducts = createAsyncThunk('products/wishlistProducts', async (formal, thunkAPI)=>{

    try {
        
        const wishlistItems  = JSON.parse(localStorage.getItem('wishlist'));

        const { data } = await axios.get(`${API_URL}/api/v1/cart`, { params: {items: wishlistItems}});
        return data.products;

    } catch (error) {
        return thunkAPI.rejectWithValue({error: "something went wrong!"});
    }
})

export const getAllCategory = createAsyncThunk('products/get/categories', async (formal, thunkAPI)=>{

    try {
        
        const { data } = await axios.get(`${API_URL}/api/v1/all/category`);
        console.log(data.categories);
        return data.categories;

    } catch (error) {
        return thunkAPI.rejectWithValue({error: error.response.data.message});
    }
})

export const createFeedback = createAsyncThunk('product/createFeedback', async (feedbackObj, thunkAPI)=>{

    try {

        const config = {
            headers: {
                'Content-Type' : 'application/json',
            },
            withCredentials : true,
        }

        const { data } = await axios.post(`${API_URL}/api/v1/product/feedback/create/${feedbackObj.productId}`, {...feedbackObj}, config);
        
        return data.product;

    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
})