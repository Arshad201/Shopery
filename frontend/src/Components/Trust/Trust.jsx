import './Trust.css';

import image1 from '../../assets/images/farming.png';
import image2 from '../../assets/images/farming2.png';
import longLeaf from '../../assets/images/long-leaf.png';
import HeartShapeLeaf from '../../assets/images/heart-shape-leaf.png';

import listIcon from '../../assets/icons/check.svg';
import btnArrow from '../../assets/icons/rightarrow.svg';

import { Link } from 'react-router-dom';
const Trust = () => {
  return (
    <section className='trust-container'>
      <div className="wrapper">
        <div className="images">
            <img src={image1} alt="farming" />
            <img src={image2} alt="farming" />
            <img className='long-leaf' src={longLeaf} alt="leaf" />
            <img className='heart-shape-leaf' src={HeartShapeLeaf} alt="leaf" />
        </div>
        <div className="content">
          <h2 className='heading3'>100% Trusted Organic Food Store</h2>
          <div className="list">
            <img src={listIcon} alt="list1" />
            <div>
              <h3 className='l-fontsize fw-500'>Healthy & natural food for lovers of healthy food.</h3>
              <p className='s-fontsize fw-400'>Ut quis tempus erat. Phasellus euismod bibendum magna non tristique. Pellentesque semper vestibulum elit sed condimentum. Nunc pretium fermentum interdum. </p>
            </div>
          </div>
          <div className="list">
            <img src={listIcon} alt="list1" />
            <div>
              <h3 className='l-fontsize fw-500'>Healthy & natural food for lovers of healthy food.</h3>
              <p className='s-fontsize fw-400'>Ut quis tempus erat. Phasellus euismod bibendum magna non tristique. Pellentesque semper vestibulum elit sed condimentum. Nunc pretium fermentum interdum. </p>
            </div>
          </div>
          <Link className='btn' to={'/shop'}>
            Shop Now<img src={btnArrow} alt="Shop Now" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Trust
