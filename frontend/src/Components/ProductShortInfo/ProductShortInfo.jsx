import './ProductShortInfo.css';

import star from '../../assets/icons/full-star.svg';
import brandImg from '../../assets/icons/farmary.svg';
import facebookIcon from '../../assets/icons/facebook.svg';
import twitterIcon from '../../assets/icons/twitter.svg';
import instagramIcon from '../../assets/icons/instagram.svg';
import pinterestIcon from '../../assets/icons/pinterest.svg';
import cartIcon from '../../assets/icons/cart.svg';
import heartIcon from '../../assets/icons/heart.svg';
import ProductImageSlider from '../ProductImageSlider/ProductImageSlider.jsx';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { addToCart, addToWishlist } from '../../utils/utils';
import { useDispatch } from 'react-redux';


const ProductShortInfo = ({setNav, data}) => {

  const [qty, setQty] = useState(1);

  const dispatch = useDispatch();

  const discount = data.additionalInfo.discount;

  return (
    <div className="product-info">
            <ProductImageSlider images={data.images}/>
            <div className="product-content">
                <div className="header">
                  <div>
                    <h4 className="heading3">{data.name}</h4>
                    <span className="badge t-fontsize fw-400">In Stock</span>
                  </div>
                  <div className='rating-SKU'>
                    <Link  className="review" onClick={()=>setNav('cf')}>
                      <div className="ratings">
                      <img className={`${data.ratings < 1 && 'unfilledStar'}`} src={star} alt="star" />
                      <img className={`${data.ratings < 2 && 'unfilledStar'}`} src={star} alt="star" />
                      <img className={`${data.ratings < 3 && 'unfilledStar'}`} src={star} alt="star" />
                      <img className={`${data.ratings < 4 && 'unfilledStar'}`} src={star} alt="star" />
                      <img className={`${data.ratings < 5 && 'unfilledStar'}`} src={star} alt="star" />
                      </div>
                      <span className="t-fontsize fw-400">{data.reviews.length} Review</span>
                    </Link>
                    <span className="t-fontsize fw-400">.</span>
                    <div className="sku t-fontsize fw-500">
                     SKU:
                     <span className='fw-400'> 2,51,594</span>
                    </div>
                  </div>
                  <div className="prices">
                    {discount > 0 && <span className="l-fontsize fw-400">${data.price}</span>}
                    <span className="xl-fontsize fw-500">${data.price - data.price*discount/100}</span>
                    {discount > 0 && <span className="badge t-fontsize fw-500">64% Off</span>}
                  </div>
                </div>
                <div className="body">
                  <div className="body-top">
                    <div className='brand-container'>
                      <span className='t-fontsize fw-400'>Brand: </span>
                      <div className="brand-img-box">
                        <img src={brandImg} alt="" />
                      </div>
                    </div>
                    <div className="social-share-container">
                      <span className="t-fontsize fw-400">Share item:</span>
                      <a href='/' className="social-icon-box"><img src={facebookIcon} alt="" /></a>
                      <a href='/' className="social-icon-box"><img src={twitterIcon} alt="" /></a>
                      <a href='/' className="social-icon-box"><img src={pinterestIcon} alt="" /></a>
                      <a href='/' className="social-icon-box"><img src={instagramIcon} alt="" /></a>
                    </div>
                  </div>
                  <p className="body-middle t-fontsize fw-400">{data.shortDesc}</p>
                  <div className="body-footer">
                    <div className="quantity-btn-container m-fontsize fw-400">
                      <button onClick={qty!==1 ? ()=>setQty(prev=>prev-1) : ()=>{}}>-</button>
                      <span >{qty}</span>
                      <button onClick={qty!==data.additionalInfo.stock ? ()=>setQty(prev=>prev+1) : ()=>{}}>+</button>
                    </div>
                    <button className='add-to-cart-btn s-fontsize fw-500' onClick={()=>addToCart(data._id, dispatch, qty)} >Add to Cart <img src={cartIcon} alt="add-to-cart" /></button>
                    <button className='add-to-wishlist'  onClick={()=>addToWishlist(data._id, dispatch)} ><img src={heartIcon} alt="add-to-wishlist"/></button>
                  </div>
                </div>
                <div className="footer">
                  <p className='s-fontsize fw-400'><span className='fw-500'>Category:</span> Vegetables</p>
                  <p className='s-fontsize fw-400'><span className='fw-500'>Tag:</span> Vegetables</p>
                </div>
            </div>
    </div>
  )
}

export default ProductShortInfo
