import './ProductCardSM.css';

import fullStar from '../../assets/icons/full-star.svg';
import bag from '../../assets/icons/cart-sm.svg';
import heartIcon from '../../assets/icons/heart-sm.svg';
import eyeIcon from '../../assets/icons/eye.svg';
import ProductImg from '../../assets/images/green-apple.jpg';
import { Link } from 'react-router-dom';

const ProductCardSM = ({product}) => {

  return (
    <Link className='product-card-sm'>
      <img src={ProductImg} alt="apple" />
      <div className="product-meta">
        <h6 className="name">{product.name}</h6>
        <span className="price">${product.price}</span>
        <div className="ratings">
            <img src={fullStar} alt="star" />
            <img src={fullStar} alt="star" />
            <img src={fullStar} alt="star" />
            <img src={fullStar} alt="star" />
            <img src={fullStar} alt="star" />
        </div>
        <div className="icons-on-hover">
          <button><img src={bag} alt="add to cart" /></button>
          <button><img src={heartIcon} alt="add to wishlist" /></button>
          <button><img src={eyeIcon} alt="view product" /></button>
        </div>
      </div>
    </Link>
  )
}

export default ProductCardSM
