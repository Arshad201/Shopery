import './ProductCard.css';

import fullStar from '../../assets/icons/full-star.svg';
import bag from '../../assets/icons/cart-sm.svg';
import heartIcon from '../../assets/icons/heart-sm.svg';
import eyeIcon from '../../assets/icons/eye.svg';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getSingleProduct } from '../../features/product/productActions'
import { addToCart, addToWishlist } from '../../utils/utils';
import { handleModal } from '../../features/product/productSlice';


const ProductCard = ({product}) => {

  const dispatch = useDispatch();
  const discount = product.additionalInfo.discount;

  const handleQuickView = () =>{
    dispatch(getSingleProduct(product._id));
    dispatch(handleModal({show:true, modalType: 'productModal'}));
  }

  return (
    <div className='product-card'>
      <Link to={`/shop/${product._id}`} className="productImg"><img src={product.images[0].url} alt="product" /></Link>
      <div className="product-card-footer">
        <Link className="product-meta" to={`/shop/${product._id}`}>
            <h3 className="s-fontsize fw-400">{product.name}</h3>
            <div className='prices'>
                <span className="discount-price m-fontsize fw-500">${product.price - (product.price*discount/100)}</span>
                {discount !== 0 && <span className="selling-price m-fontsize fw-400">${product.price}</span>}
            </div>
            <div className="ratings">
            <img className={`${product.ratings < 1 && 'unfilledStar'}`} src={fullStar} alt="star" />
            <img className={`${product.ratings < 2 && 'unfilledStar'}`} src={fullStar} alt="star" />
            <img className={`${product.ratings < 3 && 'unfilledStar'}`} src={fullStar} alt="star" />
            <img className={`${product.ratings < 4 && 'unfilledStar'}`} src={fullStar} alt="star" />
            <img className={`${product.ratings < 5 && 'unfilledStar'}`} src={fullStar} alt="star" />
            </div>
        </Link>
        <div className='iconBtn' onClick={()=>addToCart(product._id, dispatch)}><img src={bag} alt="add-to-cart" /></div>
      </div>
      {discount != 0 && <div className="badge">
        <span className='s-fontsize fw-400'>Sale</span>
        <span className='s-fontsize fw-500'>{discount}%</span>
      </div>}
      <div className="icons-on-hover">
        <button onClick={()=>addToWishlist(product._id, dispatch)}><img src={heartIcon} alt="add to wishlist" /></button>
        <button onClick={handleQuickView}><img src={eyeIcon} alt="view product" /></button>
      </div>
    </div>
  )
}

export default ProductCard
