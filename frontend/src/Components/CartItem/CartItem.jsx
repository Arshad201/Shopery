import { useDispatch } from 'react-redux';
import { getCartProducts } from '../../features/product/productActions';
import { Link } from 'react-router-dom';
import { cartCount, manageProductQuantity } from '../../features/product/productSlice';
import { handleUserAlert } from '../../features/user/userSlice';

const CartItem = ({product}) => {

    const dispatch = useDispatch();

    const discount = product.additionalInfo.discount;
    const price = product.price - product.price*discount/100


    const increaseQuantity = (id, quantity) =>{

        const updatedCartItem = {
            id,
            quantity: quantity === product.additionalInfo.stock ? quantity : quantity+1
        }

        if(updatedCartItem.quantity === product.additionalInfo.stock){
            dispatch(handleUserAlert({show:true, msg: 'You reached the stock!', type: "error"}));
        }

        dispatch(manageProductQuantity(updatedCartItem));
        
        const cartItems = JSON.parse(localStorage.getItem('cart'));
        cartItems.map(i=>{

            if(i.id === id){
                i.quantity = updatedCartItem.quantity
            }
        });

        localStorage.setItem('cart', JSON.stringify(cartItems));

    }

    const decreaseQuantity = (id, quantity) =>{

        const updatedCartItem = {
            id,
            quantity: quantity === 1 ? quantity : quantity-1
        }

        dispatch(manageProductQuantity(updatedCartItem));
        
        const cartItems = JSON.parse(localStorage.getItem('cart'));
        cartItems.map(i=>{

            if(i.id === id){
                i.quantity = updatedCartItem.quantity
            }
        });

        localStorage.setItem('cart', JSON.stringify(cartItems));

    }

    const removeItem = (id) =>{
        const cartItems = JSON.parse(localStorage.getItem('cart'));
        const updatedCart = cartItems.filter((item)=>item.id!=id);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        dispatch(getCartProducts());
        dispatch(cartCount());
        dispatch(handleUserAlert({show:true, msg: 'Product removed from your cart!', type: "success"}));
    }

    return (
        <div className="cart-item">
            <Link to={`/shop/${product._id}`} className="product">
                <img src={product.images[0].url} alt="" />
                <span className="m-fontsize fw-500">{product.name}</span>
            </Link>
            <div className="price m-fontsize fw-400">${price}</div>
            <div className="quantity">
                <div className="quantity-controller">
                    <button className='m-fontsize fw-500' onClick={()=>decreaseQuantity(product._id, product.quantity)} >-</button>
                    <span className="m-fontsize fw-400">{product.quantity}</span>
                    <button className='m-fontsize fw-500' onClick={()=>increaseQuantity(product._id, product.quantity)}>+</button>
                </div>
            </div>
            <div className="subtotal m-fontsize fw-500">${price*product.quantity} <button className='m-fontsize fw-500' onClick={()=>removeItem(product._id)}>X</button></div>
        </div>
    )
}

export default CartItem
