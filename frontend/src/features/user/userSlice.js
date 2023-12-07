import { createSlice } from "@reduxjs/toolkit";
import {loadMyProfile, signin, logout, placeOrder, myOrders, myOrderDetails, accountSetting, billingSetting, passwordSetting, newsletterAction, registerAction } from './userAction'

const initialState = {

    alert:{
        show: false,
        type: '',
        msg: ''
    },
    questionModal:{
        show: false,
        question: ""
    },
    redirect: "",
    user: {
        login: 'idle',
        loading:{
            account: false,
            billing: false,
            password: false,
            newsletter: false
        },
        data: {},
        billingInfo: {},
        status: 'idle',
        error: null
    },
    placeOrder:{
        status: 'idle',
        error: {
            firstName: '',
            lastName: '',
            streetAddress: '',
            country: '',
            state: '',
            zipCode: '',
            email: '',
            phoneNumber: '',
        }
    },
    myOrders: {
        status: 'idle',
        data:[],
        error: null
    },
    myOrderDetails: {
        status: 'idle',
        data:{},
        error: null
    }
}

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        avatarClientHanlder: (state, action)=>{
            state.user.data.avatar.url = action.payload;
        },
        handleUserAlert:(state, action)=>{

            if(action.payload.show === true){
                state.alert.show = true;
                state.alert.type = action.payload.type;
                state.alert.msg = action.payload.msg;
            }else{
                state.alert.show = false;
                state.alert.type = "";
                state.alert.msg = "";
            }
        },
        handleQuestionModal: (state, action) =>{

            if(action.payload.show === true){
                state.questionModal.show = true;
                state.questionModal.question = action.payload.question;
            }else{
                state.questionModal.show = false;
                state.questionModal.question = "";
            }
        },
        handleRedirect: (state, action) =>{
            state.redirect = action.payload
        }
    },
    extraReducers: {
        //Register
        [registerAction.pending]:(state, action)=>{
            state.user.status = 'loading'
        },
        [registerAction.fulfilled]:(state, action)=>{
            state.user.status = 'success'
            state.user.login = true;
            state.user.data = action.payload.user

            state.alert.show = true;
            state.alert.type = 'success';
            state.alert.msg = 'Accound is created!';
        },
        [registerAction.rejected]:(state, action)=>{
            state.user.status = 'failed'
            state.user.login = false;

            state.alert.show = true;
            state.alert.type = 'error';
            state.alert.msg = action.payload;
        },
        //Login
        [signin.pending]:(state, action)=>{
            state.user.status = 'loading'
        },
        [signin.fulfilled]:(state, action)=>{
            state.user.status = 'success'
            state.user.login = true;
            state.user.data = action.payload.user
        },
        [signin.rejected]:(state, action)=>{
            state.user.status = 'failed'
            state.user.login = false;

            state.alert.show = true;
            state.alert.type = 'error';
            state.alert.msg = action.payload;
        },
        //Load Profile
        [loadMyProfile.pending]:(state, action)=>{
            state.user.status = 'loading'
        },
        [loadMyProfile.fulfilled]:(state, action)=>{
            state.user.status = 'success'
            state.user.login = true;
            state.user.data = action.payload
            state.user.billingInfo = action.payload.billingInfo ? action.payload.billingInfo : {}
        },
        [loadMyProfile.rejected]:(state, action)=>{
            state.user.status = 'failed'
            state.user.login = false
        },
        //Logout
        [logout.pending]:(state, action)=>{
            state.user.status = 'loading'
        },
        [logout.fulfilled]:(state, action)=>{
            state.user.status = 'success'
            state.user.login = false;
            state.user.data = {}
        },
        [logout.rejected]:(state, action)=>{
            state.user.status = 'failed'

            state.alert.show = true;
            state.alert.type = 'error';
            state.alert.msg = action.payload;
        },
        //Place Order
        [placeOrder.pending]:(state, action)=>{
            state.placeOrder.status = 'loading'
        },
        [placeOrder.fulfilled]:(state, action)=>{
            state.placeOrder.status = 'success'
            state.alert.show = true;
            state.alert.type = 'success';
            state.alert.msg = 'Order has been placed!';
        },
        [placeOrder.rejected]:(state, action)=>{
            state.placeOrder.status = 'failed'
            state.placeOrder.error = action.payload
        },
        //Get my Orders
        [myOrders.pending]:(state, action)=>{
            state.myOrders.status = 'loading'
        },
        [myOrders.fulfilled]:(state, action)=>{
            state.myOrders.status = 'success'
            state.myOrders.data = action.payload
        },
        [myOrders.rejected]:(state, action)=>{
            state.myOrders.status = 'failed'
            state.myOrders.error = action.payload
        },
        //Get Single Order
        [myOrderDetails.pending]:(state, action)=>{
            state.myOrderDetails.status = 'loading'
        },
        [myOrderDetails.fulfilled]:(state, action)=>{
            state.myOrderDetails.status = 'success'
            state.myOrderDetails.data = action.payload
        },
        [myOrderDetails.rejected]:(state, action)=>{
            state.myOrderDetails.status = 'failed'
            state.myOrderDetails.error = action.payload
        },
        
        //For Account Setting
        [accountSetting.pending]:(state, action)=>{
            state.user.loading.account = true
        },
        [accountSetting.fulfilled]:(state, action)=>{
            state.user.loading.account = false
            state.user.login = true;
            state.user.data = action.payload.user
            state.alert.show = true;
            state.alert.type = 'success';
            state.alert.msg = 'Saved successfully!';
        },
        [accountSetting.rejected]:(state, action)=>{
            state.user.loading.account = false
            state.alert.show = true;
            state.alert.type = 'error';
            state.alert.msg = action.payload;
        },
        //For Billing Setting
        [billingSetting.pending]:(state, action)=>{
            state.user.loading.billing = true
        },
        [billingSetting.fulfilled]:(state, action)=>{
            state.user.loading.billing = false
            state.user.billingInfo = action.payload.user.billingInfo
            state.alert.show = true;
            state.alert.type = 'success';
            state.alert.msg = 'Saved successfully!';
        },
        [billingSetting.rejected]:(state, action)=>{
            state.user.loading.billing = false
            state.alert.show = true;
            state.alert.type = 'error';
            state.alert.msg = action.payload;
        },
        //For Password Change
        [passwordSetting.pending]:(state, action)=>{
            state.user.loading.password = true
        },
        [passwordSetting.fulfilled]:(state, action)=>{
            state.user.loading.password = false
            state.alert.show = true;
            state.alert.type = 'success';
            state.alert.msg = 'Password Change successfully!';
        },
        [passwordSetting.rejected]:(state, action)=>{
            state.user.loading.password = false
            state.alert.show = true;
            state.alert.type = 'error';
            state.alert.msg = action.payload;
        },
        [newsletterAction.pending]:(state, action)=>{
            state.user.loading.newsletter = true;
        },
        [newsletterAction.fulfilled]:(state, action)=>{
            state.user.loading.newsletter = false;
            state.alert.show = true;
            state.alert.type = 'success';
            state.alert.msg = 'Thanks for Newsletter subscription!';
        },
        [newsletterAction.rejected]:(state, action)=>{
            state.user.loading.newsletter = false;
            state.alert.show = true;
            state.alert.type = 'error';
            state.alert.msg = action.payload;
        }
    }

})

export const { handleUserAlert, handleQuestionModal, handleRedirect, avatarClientHanlder } = userSlice.actions

export default userSlice.reducer;
