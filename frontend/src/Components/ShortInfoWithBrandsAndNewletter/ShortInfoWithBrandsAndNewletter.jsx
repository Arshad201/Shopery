import './ShortInfoWithBrandsAndNewletter.css';

import stepsLogo from '../../assets/icons/steps-brand.svg';
import mangoLogo from '../../assets/icons/mango-brand.svg';
import food1Logo from '../../assets/icons/food1-brand.svg';
import food2Logo from '../../assets/icons/food2-brand.svg';
import bookOffLogo from '../../assets/icons/bookoff-brand.svg';
import gSeriesLogo from '../../assets/icons/g-series-brand.svg';
import btnLoader from '../../assets/icons/btn-loader.png';
import locationIcon from '../../assets/icons/map.svg';
import dialIcon from '../../assets/icons/dial.svg';
import msgIcon from '../../assets/icons/mail.svg';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { newsletterAction } from 
import { newsletterAction } from '../../features/user/userAction';


const ShortInfoWithBrandsAndNewletter = () => {

    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const {newsletter} = useSelector(state=>state.userReducer.user.loading)

    const handleNewsletterSubscribe = (e) =>{

        e.preventDefault();
        dispatch(newsletterAction(email));
        setEmail("");

    }
  return (
    <section className='short-info-brand-newsletter'>
      <div className="wrapper">
        <div className="brand-img-container">
            <img src={stepsLogo} alt="" />
            <span className="vertial-line"></span>
            <img src={mangoLogo} alt="" />
            <span className="vertial-line"></span>
            <img src={food1Logo} alt="" />
            <span className="vertial-line"></span>
            <img src={food2Logo} alt="" />
            <span className="vertial-line"></span>
            <img src={bookOffLogo} alt="" />
            <span className="vertial-line"></span>
            <img src={gSeriesLogo} alt="" />
        </div>
        <div className="info-newletter-container">
            <div className="box">
                <div>
                    <img src={locationIcon} alt="" />
                </div>
                <h4 className='m-fontsize fw-500'>OUR LOCATION</h4>
                <p className="s-fontsize fw-400">1901 Thornridge Cir. Shiloh, Washington DC 20020, United States</p>
            </div>
            <div className="box">
                <div>
                    <img src={dialIcon} alt="" />
                </div>
                <h4 className='m-fontsize fw-500'>CALL US 24/7</h4>
                <h3 className='contact-number'>(303) 555-0105</h3>
            </div>
            <div className="box">
                <div>
                    <img src={msgIcon} alt="" />
                </div>
                <h4 className='m-fontsize fw-500'>SUBSCRIBE NEWSLETTER</h4>
                <form onSubmit={handleNewsletterSubscribe}>
                    <input type="email" placeholder='Your email address' value={email} onChange={(e)=>setEmail(e.target.value)} />
                    <button type="submit" className='btn'>
                        Subscribe
                        {newsletter && <img className='lodingIcon' src={btnLoader} alt="" />}
                        </button>
                </form>
            </div>
        </div>
      </div>
    </section>
  )
}

export default ShortInfoWithBrandsAndNewletter
