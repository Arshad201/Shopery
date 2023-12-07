// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './HeroSlider.css';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';

import { Link } from 'react-router-dom';
import sliderImg from '../../assets/images/sliderImg.png'
import btnArrow from '../../assets/icons/rightarrow.svg';

const HeroSlider = () => {

  return (
    <section className="hero-container">
       <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
            <div className="slide-content">
                <img src={sliderImg} alt="freshveggies" />
                <div>
                    <h5>Welcome to shopery</h5>
                    <h1 className='display1'>Fresh & Healthy <br/>Organic Food</h1>
                    <h4>Sale up to <span>30% OFF</span></h4>
                    <p className='s-fontsize'>Free shipping on all your order. we deliver, you enjoy</p>
                    <Link className="btn" to={'/shop'}>Shop now <img src={btnArrow} alt="->" /></Link>
                </div>
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className="slide-content">
                <img src={sliderImg} alt="freshveggies" />
                <div>
                    <h5>Welcome to shopery</h5>
                    <h1 className='display1'>Fresh & Healthy <br/>Organic Food</h1>
                    <h4>Sale up to <span>30% OFF</span></h4>
                    <p className='s-fontsize'>Free shipping on all your order. we deliver, you enjoy</p>
                    <Link className="btn" to={'/shop'}>Shop now <img src={btnArrow} alt="->" /></Link>
                </div>
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className="slide-content">
                <img src={sliderImg} alt="freshveggies" />
                <div>
                    <h5>Welcome to shopery</h5>
                    <h1 className='display1'>Fresh & Healthy <br/>Organic Food</h1>
                    <h4>Sale up to <span>30% OFF</span></h4>
                    <p className='s-fontsize'>Free shipping on all your order. we deliver, you enjoy</p>
                    <Link className="btn" to={'/shop'}>Shop now <img src={btnArrow} alt="->" /></Link>
                </div>
            </div>
        </SwiperSlide>
      </Swiper>
    </section>
  )
}

export default HeroSlider
