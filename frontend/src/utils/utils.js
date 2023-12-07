import { cartCount } from "../features/product/productSlice";
import { handleUserAlert } from "../features/user/userSlice";

export const addToCart = (id, dispatch, quantity=1) =>{

    let cartItems = JSON.parse(localStorage.getItem('cart'));
  
    //check - Product is Already exist
    if(cartItems!=null && cartItems.some((i)=>i.id==id)){

      dispatch(handleUserAlert({show: true, type: 'error', msg: 'This Product is already in your cart!'}))

      return;
    }
    
    cartItems = cartItems === null ? [] : cartItems;
  
    //Add Product Id to LocalStorage of cart
    localStorage.setItem('cart', JSON.stringify([...cartItems, {id: id, quantity: quantity}]));
    dispatch(cartCount());

    dispatch(handleUserAlert({show: true, type: 'success', msg: 'Product added to your cart!'}));

  }


  export const addToWishlist = (id, dispatch) =>{


    let wishlistItems = JSON.parse(localStorage.getItem('wishlist'));

    //check - Product is Already exist
    if(wishlistItems!=null && wishlistItems.includes(id)){
      dispatch(handleUserAlert({show: true, type: 'error', msg: 'This Product is already in your wishlist!'}));
      return;
    }
    
    wishlistItems = wishlistItems === null ? [] : wishlistItems;

    //Add Product Id to LocalStorage of wishlist
    localStorage.setItem('wishlist', JSON.stringify([...wishlistItems, id]));
    dispatch(handleUserAlert({show: true, type: 'success', msg: 'Product added to your wishlist!'}));

  }