import './Header.css';
import LocationIcon from '../../assets/icons/location.svg';
import ArrowIcon from '../../assets/icons/down-arrow.svg';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, NavLink, useLocation } from 'react-router-dom';

import WebsiteLogo from '../../assets/icons/logo.svg';
import phoneIcon from '../../assets/icons/phone.svg';
import searchIcon from '../../assets/icons/search.svg';
import HeartIcon from '../../assets/icons/heart.svg';
import cartIcon from '../../assets/icons/cart.svg';
import userIcon from '../../assets/icons/user.svg';
import { useDispatch, useSelector } from 'react-redux';
import { handleModal } from '../../features/product/productSlice';

const Header = () => {

  const location = useLocation();
  const dispatch = useDispatch();
  
  const [view, setView] = useState(false);
  const [isOpenLang, setIsOpenLang] = useState(false);
  const [isOpenCurr, setIsOpenCurr] = useState(false);
  const [currencies, setCurrencies] = useState({});
  const [selectedCurr, setSelectedCurr] = useState("USD");
  const [selectedLang, setSelectedLang] = useState("");

  const data = {
    "AUD":1.5541101667,
    "BGN":1.8403103111,
    "BRL":5.0341506199
  }

  const HandleSelect =(action) =>{

    if(action === 'curr'){
      setIsOpenCurr(!isOpenCurr);
      setIsOpenLang(false);
    }else{
      setIsOpenLang(!isOpenLang);
      setIsOpenCurr(false);
    }

  }

  const loadCurrencies = async() =>{

    const url = 'https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_PoSfUqCkfXzeOiat1k1QDWPSvWOnDbMt9dr7AIyo';
    const {data} = await axios.get(url);
    setCurrencies(data.data);

  }

  const {cartCount} = useSelector(state=>state.productReducer)


  useEffect(()=>{
    loadCurrencies();
  },[]);

  return (
    <header className='header'>
        {/* <div className="top-bar">
          <div className="wrapper">
            <div>
              <img src={LocationIcon} alt="location" />
              <span className='t-fontsize'>Store Location: Lincoln- 344, Illinois, Chicago, USA</span>
            </div>
            <div>
              <div className="lang-wrapper">
                <div className="selected-lang" onClick={()=>HandleSelect("lang")}>
                  <span className='t-fontsize'>Eng</span>
                  <img src={ArrowIcon} alt="Select Lang" />
                </div>
                {isOpenLang && <div className="custom-list">
                  <span className='t-fontsize'>English</span>
                  <span className='t-fontsize active-lang'>Hindi</span>
                  <span className='t-fontsize'>Bengali</span>
                  <span className='t-fontsize'>Tamil</span>
                </div>}
              </div>
              <div className="curr-wrapper">
                <div className="selected-curr" onClick={()=>HandleSelect("curr")}>
                  <span className='t-fontsize'>{selectedCurr}</span>
                  <img src={ArrowIcon} alt="Select Lang" />
                </div>
                {isOpenCurr && <div className="custom-list">
                  {
                  Object.keys(currencies).map((key, index) =><span key={index} onClick={()=>setSelectedCurr(key)} className={`t-fontsize ${selectedCurr === key && 'active-curr'}`}>{key}</span>)}
                </div>}
              </div>
            </div>
          </div>
        </div> */}
        <div className="main-header">
          <div className='navlinks-wrapper'>
            <div className={`menu-icon ${!view ? 'openMenu': 'closeMenu'}`} onClick={()=>setView(!view)}>
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
            </div>
            <nav className={`nav-links ${view ? 'openNav': 'closeNav'}`}>
              <NavLink className={`s-fontsize ${location.pathname === '/' && 'active-nav-link'}`} to="/" >Home</NavLink>
              <NavLink className={`s-fontsize ${location.pathname === '/shop' && 'active-nav-link'}`} to="/shop" >Shop</NavLink>
            </nav>
          </div>
          <a href="/" className="logo">
            <img src={WebsiteLogo} alt="Ecobazar" />
          </a>
          <div className="header-icons">
            <div className="contact">
              <img src={phoneIcon} alt="contact" />
              <span className='s-fontsize'>(219) 555-0114</span>
            </div>
            <img src={searchIcon} alt="search" onClick={()=>dispatch(handleModal({show: true, modalType: 'searchModal'}))} />
            <Link to='/wishlist'><img src={HeartIcon} alt="wishlist" /></Link>
            <Link to='/cart' className='cart-icon-wrapper'>
              <span className="cart-count">{cartCount}</span>
              <img src={cartIcon} alt="cart" />
              {/* <div className="cart-price">
                <h6>Shopping cart:</h6>
                <span>$57.00</span>
              </div> */}
            </Link>
            <Link to={'/signin'}><img src={userIcon} alt="login" /></Link>
          </div>
        </div>
    </header>
  )
}

export default Header
