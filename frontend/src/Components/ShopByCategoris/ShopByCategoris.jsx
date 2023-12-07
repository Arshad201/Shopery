import './ShopByCategoris.css';

import { Link } from 'react-router-dom';
import BtnArrow from '../../assets/icons/green-arrow.svg';
import vegetablesImage from '../../assets/icons/vegetable.svg';
import fruitsImage from '../../assets/icons/fruits.svg';
import fishImage from '../../assets/icons/fish.svg';
import meatImage from '../../assets/icons/meat.svg';
import drinkImage from '../../assets/icons/soft-drink.svg';
import snacksImage from '../../assets/icons/snacks.svg';

const ShopByCategoris = () => {
  return (
    <section className='categories-section'>
      <div className='section-header-1'>
        <h3 className="heading3">Shop by Top Categories</h3>
        {/* <Link className="m-fontsize fw-500">View All <img src={BtnArrow} alt="view all" /></Link> */}
      </div>
      <div className="categories-container">
        <Link className="category-card">
            <img src={vegetablesImage} alt="vegetables" />
            <h3 className='l-fontsize fw-500'>Vegetables</h3>
            <p className='s-fontsize fw-500'>165 Products</p>
        </Link>
        <Link className="category-card">
            <img src={fruitsImage} alt="vegetables" />
            <h3 className='l-fontsize fw-500'>Fresh Fruit</h3>
            <p className='s-fontsize fw-500'>137 Products</p>
        </Link>
        <Link className="category-card">
            <img src={fishImage} alt="vegetables" />
            <h3 className='l-fontsize fw-500'>Fish</h3>
            <p className='s-fontsize fw-500'>34 Products</p>
        </Link>
        <Link className="category-card">
            <img src={meatImage} alt="vegetables" />
            <h3 className='l-fontsize fw-500'>Meat</h3>
            <p className='s-fontsize fw-500'>165 Products</p>
        </Link>
        <Link className="category-card">
            <img src={drinkImage} alt="vegetables" />
            <h3 className='l-fontsize fw-500'>Water and Drinks</h3>
            <p className='s-fontsize fw-500'>48 Products</p>
        </Link>
        <Link className="category-card">
            <img src={snacksImage} alt="vegetables" />
            <h3 className='l-fontsize fw-500'>Snacks</h3>
            <p className='s-fontsize fw-500'>165 Products</p>
        </Link>
      </div>
    </section>
  )
}

export default ShopByCategoris
