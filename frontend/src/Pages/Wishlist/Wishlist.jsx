import  './Wishlist.css';
import PageHeader from '../../Components/PageHeader/PageHeader'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getWishlistProducts } from '../../features/product/productActions';
import { addToCart } from '../../utils/utils';
import { Link } from 'react-router-dom';
import { handleUserAlert } from '../../features/user/userSlice';

const Wishlist = () => {
    
    const dispatch = useDispatch();
    const {data, status} = useSelector(state=>state.productReducer.products.wishlistProducts);

    const removeItem = (id) =>{
        const wishlist = JSON.parse(localStorage.getItem('wishlist'));
        const updatedWishlist = wishlist.filter((item)=>item!=id);
        localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
        
        dispatch(getWishlistProducts());

        dispatch(handleUserAlert({show:true, msg: 'Product removed from your wislist!', type: "success"}));
    }

    useEffect(()=>{
        dispatch(getWishlistProducts());
    }, []);
    
  return (
    <section className='wishlist'>
      <PageHeader/>
      <h1 className='heading3'>My Wishlist</h1>
      {data.length > 0 ? <div className="wishlist-container">
        <div className="wishlist-headings">
            <h3 className="m-fontsize fw-500">PRODUCT</h3>
            <h3 className="m-fontsize fw-500">PRICE</h3>
            <h3 className="m-fontsize fw-500">STOCK</h3>
        </div>
        {
        status === 'loading' ? <>Loading...</> :  
        data?.map((product)=><div key={product._id} className="wishlist-item">
            <Link to={`/shop/${product._id}`} className="productInfo">
                <img src={product.images[0].url} alt="" />
                <span className="s-fontsize fw-400">{product.name}</span>
            </Link>
            <div className="product-prices">
                <span className='m-fontsize fw-500'>${product.price - (product.price*product.additionalInfo.discount/100)} </span>
                {product.additionalInfo.discount > 0 && <span className='m-fontsize fw-400'> ${product.price}</span>}
            </div>
            <div className="stock-actions">
                {product.additionalInfo.stock > 10 && <span className="stock s-fontsize fw-400">In Stock</span>}
                {product.additionalInfo.stock < 10 && <span className="stock s-fontsize fw-400">only {product.additionalInfo.stock} are left</span>}
                {product.additionalInfo.stock === 0 && <span className="stock s-fontsize fw-400">Out of Stock Stock</span>}
                <div className="actions">
                    <button className="btn" onClick={()=>addToCart(product._id, dispatch)}>Add to Cart</button>
                    <button onClick={()=>removeItem(product._id)}>X</button>
                </div>
            </div>
        </div>)
        }
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

export default Wishlist
