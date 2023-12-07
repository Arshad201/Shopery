import  './Cart.css';
import PageHeader from '../../Components/PageHeader/PageHeader';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCartProducts } from '../../features/product/productActions';
import CartItem from '../../Components/CartItem/CartItem.jsx';
import { useNavigate, Link } from 'react-router-dom';

const Cart = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const {data, status} = useSelector(state=>state.productReducer.products.cartProducts);
    const {login} = useSelector(state=>state.userReducer.user);

    const [shippingCharges, setShippingCharges] = useState(40);

    let total = 0
    data.forEach(product => {
        const productPrice = product.price - (product.price*product.additionalInfo.discount/100);
        const subTotal = productPrice*product.quantity;
        total = total + subTotal;
    });


    const goToCheckoutHandler = () =>{
        navigate(`${login ? '/checkout' : '/signin?redirect=checkout'}`);
    }

    useEffect(()=>{
        dispatch(getCartProducts());
    }, []);

  return (
    <section className='cart'>
      <PageHeader/>
      <h1 className='heading3'>My Shopping Cart</h1>
      {data.length > 0 ? <div className="cart-container">
        <div className="product-coupon-wrapper">
            <div className="cart-item-container">
                <div className="cart-headings">
                    <h3 className="m-fontsize fw-500">PRODUCT</h3>
                    <h3 className="m-fontsize fw-500">PRICE</h3>
                    <h3 className="m-fontsize fw-500">Quantity</h3>
                    <h3 className="m-fontsize fw-500">Subtotal</h3>
                </div>
                {status === 'loading' ? <>Loading</> 
                : data.map((item)=><CartItem key={item._id} product={item} />)
                }
            </div>
            {/* <div className="coupon">
                
            </div> */}
        </div>
        <div className="cart-total">
            <h3 className="xl-fontsize fw-500">Cart Total</h3>
            <div className="row">
                <span className="s-fontsize fw-400">Subtotal:</span>
                <span className="s-fontsize fw-500">${total}</span>
            </div>
            <div className="row">
                <span className="s-fontsize fw-400">Shipping:</span>
                <span className="s-fontsize fw-500">{shippingCharges === 0 ? 'Free' : `+$${shippingCharges}`}</span>
            </div>
            <div className="row">
                <span className="m-fontsize fw-400">Total:</span>
                <span className="m-fontsize fw-600">${total+shippingCharges}</span>
            </div>
            <button className="btn" onClick={goToCheckoutHandler}>Proceed to checkout</button>
        </div>
      </div>
      :
      <div className="wishlist-container p-not-found">
      <h2 className='m-fontsize'>NO Product Found!</h2>
      <Link className='btn' to={'/shop'}>Go to Shop</Link>
      </div>  
      }
    </section>
  )
}

export default Cart
