import { createSlice } from '@reduxjs/toolkit'; 
import { getCartProducts, getWishlistProducts,  getProducts, getSingleProduct, getAllCategory, createFeedback } from './productActions';

const initialState = {

    productModal: false,
    searchModal: false,
    ratingModal: false,
    avatarModal: false,
    productQueries:{actionType: 'shopProducts', resultPerPage: 15, currentPage: 1, category: 'All', sortBy: 'Latest'},
    cartCount: 0,
    categories: {
        status: 'idle',
        data: [],
        error: null
    },
    products : {
        shopProducts: {
            status: 'idle',
            productTotals: 0,
            pages: 0,
            data: [],
            error: null,
        },

        singleProduct: {
            status: 'idle',
            data: {},
            error: null,
        },
        
        cartProducts: {
            status: 'idle',
            data: [],
            error: null,
        },

        wishlistProducts: {
            status: 'idle',
            data: [],
            error: null,
        },

        featuredProducts: {
            status: 'idle',
            data: [],
            error: null,
        },

        bestSellersProducts: {
            status: 'idle',
            data: [],
            error: null,
        },

        hotDealsProducts: {
            status: 'idle',
            data: [],
            error: null,
        },

        topRatedProducts: {
            status: 'idle',
            data: [],
            error: null,
        },
    }
}

export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: { 
        manageProductQuantity: (state, action) =>{

            state.products.cartProducts.data.map((product)=>{

                const {id, quantity} = action.payload;

                if(product._id === id){ 
                    product.quantity = quantity;
                }

            })
        },
        cartCount: (state, action) =>{
            let cartCount = JSON.parse(localStorage.getItem('cart'))
            cartCount = cartCount ? cartCount.length : 0
            state.cartCount = cartCount
        },
        handleModal: (state, action) =>{
            state[action.payload.modalType] = action.payload.show;
        },
        productQueryHandler: (state, action)=>{
            state.productQueries = action.payload
        }
    },
    extraReducers:{
        [createFeedback.pending]: (state, action) =>{
            state.products['singleProduct'].status = 'idle';
        },
        [createFeedback.fulfilled]: (state, action) =>{
            state.products['singleProduct'].data = action.payload;
            state.products['singleProduct'].status = 'succeed';
        },
        [createFeedback.rejected]: (state, action) =>{
            state.products['singleProduct'].status = 'failed';
            state.products['singleProduct'].error = action.error;
        },
        [getAllCategory.pending]: (state, action) =>{
            state.categories.status = 'loading';
        },
        [getAllCategory.fulfilled]: (state, action) =>{
            state.categories.status = 'success';
            state.categories.data = action.payload;
        },
        [getAllCategory.rejected]: (state, action) =>{
            state.categories.error = action.payload;
        },
        [getProducts.pending]: (state, action) =>{
            state.products[action.meta.arg.actionType].status = 'loading';
            state.products[action.meta.arg.actionType].error = null;
        },
        [getProducts.fulfilled]: (state, action) =>{

            if(action.meta.arg.actionType === 'shopProducts'){
                
                state.products[action.meta.arg.actionType].data = action.payload.products;
                state.products[action.meta.arg.actionType].status = 'succeed';
                state.products[action.meta.arg.actionType].productTotals = action.payload.productCount;
                state.products[action.meta.arg.actionType].pages = action.payload.pages;
                
                return;
            }

            state.products[action.meta.arg.actionType].data = action.payload;
            state.products[action.meta.arg.actionType].status = 'succeed';

        },
        [getProducts.rejected]: (state, action) =>{
            state.products[action.meta.arg.actionType].status = 'failed';
            state.products[action.meta.arg.actionType].error = action.error;
        },
        [getSingleProduct.pending]: (state, action) =>{
            state.products['singleProduct'].status = 'idle';
        },
        [getSingleProduct.fulfilled]: (state, action) =>{
            state.products['singleProduct'].data = action.payload;
            state.products['singleProduct'].status = 'succeed';
        },
        [getSingleProduct.rejected]: (state, action) =>{
            state.products['singleProduct'].status = 'failed';
            state.products['singleProduct'].error = action.error;
        },
        [getCartProducts.pending]: (state, action) =>{
            state.products['cartProducts'].status = 'loading';
            state.products['cartProducts'].error = null;
        },
        [getCartProducts.fulfilled]: (state, action) =>{
            state.products['cartProducts'].data = action.payload;
            state.products['cartProducts'].status = 'succeed';
        },
        [getCartProducts.rejected]: (state, action) =>{
            state.products['cartProducts'].status = 'failed';
            state.products['cartProducts'].error = action.error;
        },
        [getWishlistProducts.pending]: (state, action) =>{
            state.products['wishlistProducts'].status = 'loading';
        },
        [getWishlistProducts.fulfilled]: (state, action) =>{
            state.products['wishlistProducts'].data = action.payload;
            state.products['wishlistProducts'].status = 'succeed';
        },
        [getWishlistProducts.rejected]: (state, action) =>{
            state.products['wishlistProducts'].status = 'failed';
            state.products['wishlistProducts'].error = action.error;
        },
        
    }
});

export const { manageProductQuantity, cartCount, handleModal, productQueryHandler } = productSlice.actions;

export default productSlice.reducer;
