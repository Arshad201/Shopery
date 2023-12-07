import './PromotionalCardHome.css';
import btnArrow from '../../assets/icons/rightArrow.svg';
import moment from 'moment';

import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const PromotionalCardHome = () => {

  const [timer, setTimer] = useState(1 * 2 * 60 * 60);

  const formatTime = (time) => {
    const days = Math.floor(time/86400)
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    const formattedTime = `${String(days).padStart(2, '0')}: ${String(hours).padStart(2, '0')}:${String(
      minutes
    ).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    return formattedTime;
  };

  useEffect(()=>{

    const timeInterval = setInterval(() => {
      setTimer(prev=>prev-1);
    }, 1000);
    
    // Cleanup the interval when the component is unmounted
    return () => clearInterval(timeInterval);
  })
  return (
    <section className='promotional-cards-home'>
      <div className="wrapper">
        <div className="card">
            <span>100% Organic</span>
            <h4 className='heading4'>Fruit & Vegetable</h4>
            <div className='badge-container'>
                <span className='s-fontsize fw-400'>Starting at: </span>
                <div className="badge m-fontsize fw-500">$11.99</div>
            </div>
            <Link className='btn' to={'/shop'} >Shop Now <img src={btnArrow} alt="Shop Now" /></Link>
        </div>
        <div className="card">
            <span>sale off the week</span>
            <h4 className='heading4'>Sales of the Year</h4>
            <div className='timer-container'>
                <div className='timer-box'>
                    <span className='xl-fontsize fw-400'>{formatTime(timer).slice(0, 2)}</span>
                    <span>Days</span>
                </div>
                <span>:</span>
                <div className='timer-box'>
                    <span className='xl-fontsize fw-400'>{formatTime(timer).slice(3, 6)}</span>
                    <span>Hours</span>
                </div>
                <span>:</span>
                <div className='timer-box'>
                    <span className='xl-fontsize fw-400'>{formatTime(timer).slice(7, 9)}</span>
                    <span>Mins</span>
                </div>
                <span>:</span>
                <div className='timer-box'>
                    <span className='xl-fontsize fw-400'>{formatTime(timer).slice(10, 13)}</span>
                    <span>Secs</span>
                </div>
            </div>
            <Link className='btn' to={'/shop'} >Shop Now <img src={btnArrow} alt="Shop Now" /></Link>
        </div>
      </div>
    </section>
  )
}

export default PromotionalCardHome
