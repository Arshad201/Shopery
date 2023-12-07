import  './Footer.css';

import logo from '../../assets/icons/logo-light.svg';

import fb from '../../assets/icons/facebook.svg';
import twitter from '../../assets/icons/twitter.svg';
import instagram from '../../assets/icons/instagram.svg';
import pinterest from '../../assets/icons/pinterest.svg';

import AppleStore from '../../assets/icons/apple-store.svg';
import PlayStore from '../../assets/icons/play-store.svg';

import ApplePayIcon from '../../assets/icons/apple-pay.svg';
import VisaPayIcon from '../../assets/icons/visa-pay.svg';
import DiscoverPayIcon from '../../assets/icons/discover-pay.svg';
import MastercardPayIcon from '../../assets/icons/mastercard-pay.svg';
import SecurePayIcon from '../../assets/icons/secure-pay.svg';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
        <div className="widgets">
          <div className="widget">
            <a href="/">
              <img src={logo} alt="" />
            </a>
            <p className='s-fontsize fw-400 companyInfo'>Morbi cursus porttitor enim lobortis molestie. Duis gravida turpis dui, eget bibendum magn.</p>
            <div className="social-icons-box">
              <a href="/" target='_blank'>
                <img src={fb} alt="fb" />
              </a>
              <a href="/" target='_blank'>
                <img src={twitter} alt="twitter" />
              </a>
              <a href="/" target='_blank'>
                <img src={pinterest} alt="pinterest" />
              </a>
              <a href="/" target='_blank'>
                <img src={instagram} alt="instagram" />
              </a>
            </div>
          </div>
          <div className="widget">
            <h3 className='l-fontsize fw-500'>My Account</h3>
            <hr/>
            <Link className='s-fontsize fw-400' to={'/account/dashboard'}>My Account</Link>
            <Link className='s-fontsize fw-400' to={'/account/orders'}>Order History</Link>
            <Link className='s-fontsize fw-400' to={'/cart'}>Shopping Cart</Link>
            <Link className='s-fontsize fw-400'to={'/wishlist'}>Wishlist</Link>
          </div>
          <div className="widget">
            <h3 className='l-fontsize fw-500'>Helps</h3>
            <hr/>
            <Link className='s-fontsize fw-400' to={'/faqs'}>Faqs</Link>
          </div>
          <div className="widget">
            <h3 className='l-fontsize fw-500'>Proxy</h3>
            <hr/>
            <Link className='s-fontsize fw-400' to={'/shop'}>Shop</Link>
          </div>
          <div className="widget">
            <h3 className='l-fontsize fw-500'>Download Mobile App</h3>
            <hr/>
             <div className="download-app-btns">
              <a href="/"><img src={AppleStore} alt="apple store" /></a>
              <a href="/"><img src={PlayStore} alt="google paly" /></a>
             </div>
          </div>
        </div>
        <hr className='line'/>
        <div className="bottom">
          <span className="s-fontsize fw-400">Ecobazar eCommerce © 2021. All Rights Reserved</span>
          <div>
            <img src={ApplePayIcon} alt="apple pay" />
            <img src={VisaPayIcon} alt="Visa pay" />
            <img src={DiscoverPayIcon} alt="Discover pay" />
            <img src={MastercardPayIcon} alt="Mastercard pay" />
            <img src={SecurePayIcon} alt="Sercure pay" />
          </div>
        </div>
    </footer>
  )
}

export default Footer
