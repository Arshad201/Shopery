import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = window.location.origin;

export const registerAction = createAsyncThunk('user', async (userData, thunkAPI)=>{


    try {

        const config = {
            headers: {
                'Content-Type' : 'application/json',
            },
            withCredentials : true,
            
        }

        console.log(userData);

        const { data } = await axios.post(`${API_URL}/api/v2/register`, {...userData}, config);
        return data;

    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
})

export const signin = createAsyncThunk('user', async (userData, thunkAPI)=>{

    try {

        const config = {
            headers: {
                'Content-Type' : 'application/json',
            },
            withCredentials : true,
        }

        const { data } = await axios.post(`${API_URL}/api/v2/login`, {...userData}, config);
        return data;

    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
})

export const loadMyProfile = createAsyncThunk('user/loadprofile', async (data, thunkAPI)=>{
    try {

        const config = {
            headers: {
                'Content-Type' : 'application/json',
            },
            withCredentials : true,
        }

        const { data } = await axios.get(`${API_URL}/api/v2/getmyprofile`, config);

        return data.user;

    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
})

export const logout = createAsyncThunk('user/logout', async (data, thunkAPI)=>{
    try {

        const config = {
            headers: {
                'Content-Type' : 'application/json',
            },
            withCredentials : true,
        }

        const { data } = await axios.post(`${API_URL}/api/v2/logout`, {}, config);
        return data;

    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
})

export const placeOrder = createAsyncThunk('user/placeOrder', async (userData, thunkAPI)=>{

    try {

        const config = {
            headers: {
                'Content-Type' : 'application/json',
            },
            withCredentials : true,
        }

        const { data } = await axios.post(`${API_URL}/api/v3/place/order`, {...userData}, config);

        localStorage.setItem('cart', JSON.stringify([]));
        
        return data.sucess;

    } catch (error) {
        if(error.response.data.message){
            return thunkAPI.rejectWithValue(error.response.data.message);
        }else{
            return thunkAPI.rejectWithValue(error.response.data.errorObj);
        }
    }
})

export const myOrders = createAsyncThunk('user/myOrders', async (userData, thunkAPI)=>{

    try {

        const config = {
            headers: {
                'Content-Type' : 'application/json',
            },
            withCredentials : true,
        }

        const { data } = await axios.get(`${API_URL}/api/v3/get/myorders`, config);

        return data.orders;

    } catch (error) {

        return thunkAPI.rejectWithValue(error.response.data.message);

    }
})

export const myOrderDetails = createAsyncThunk('user/OrderDetails', async (id, thunkAPI)=>{

    try {

        const config = {
            headers: {
                'Content-Type' : 'application/json',
            },
            withCredentials : true,
        }

        const { data } = await axios.get(`${API_URL}/api/v3/get/myorders/${id}`, config);

        return data.getSingleOrder;

    } catch (error) {

        return thunkAPI.rejectWithValue(error.response.data.message);

    }
});

export const accountSetting = createAsyncThunk('user/accountSetting', async (userData, thunkAPI)=>{

    try {

        console.log(userData);

        const config = {
            headers: {
                'Content-Type' : 'application/json',
            },
            withCredentials : true,
        }

        const { data } = await axios.post(`${API_URL}/api/v2/account/setting`, {...userData}, config);
        return data;

    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
});

export const billingSetting = createAsyncThunk('user/billingSetting', async (billingData, thunkAPI)=>{

    try {

        const config = {
            headers: {
                'Content-Type' : 'application/json',
            },
            withCredentials : true,
        }

        const { data } = await axios.post(`${API_URL}/api/v2/setting/billing`, {...billingData}, config);

        return data;

    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
});

export const passwordSetting = createAsyncThunk('user/ChangePassword', async (passwords, thunkAPI)=>{

    try {

        const config = {
            headers: {
                'Content-Type' : 'application/json',
            },
            withCredentials : true,
        }

        const { data } = await axios.post(`${API_URL}/api/v2/change/password`, {...passwords}, config);
        
        return data;

    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
});

export const newsletterAction = createAsyncThunk('user/newsletter', async (email, thunkAPI)=>{

    try {

        const config = {
            headers: {
                'Content-Type' : 'application/json',
            },
            withCredentials : true,
        }

        const { data } = await axios.post(`${API_URL}/api/v2/submit/newsletter`, {email}, config);
        
        return data.sucess;

    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
})