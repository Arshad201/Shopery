import quoteIcon from '../../assets/icons/quote.svg'
import starIcon from '../../assets/icons/full-star.svg'
import userImage from '../../assets/images/testimonial-user.png';

// Import Swiper React components
import { Swiper, SwiperSlide} from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import 'styles';
import './Testimonials.css';

// import required modules

const Testimonials = () => {

  return (
    <section className="testimonials">
      <div className='section-header-1'>
            <h3 className="heading3">What Our Customer Says</h3>
      </div>
      <>
      <Swiper
        breakpoints={{
          500: {
            slidesPerView: 1,
            spaceBetween: 10
          },
          700: {
            slidesPerView: 2,
            spaceBetween: 20
          },
          1100: {
            slidesPerView: 3,
            spaceBetween: 20
          }
        }}
        autoplay={true}
        className="mySwiper"
      >
      <SwiperSlide>
        <img src={quoteIcon} alt="" />
        <p className='t-fontsize fw-400'>Pellentesque eu nibh eget mauris congue mattis mattis nec tellus. Phasellus imperdiet elit eu magna dictum, bibendum cursus velit sodales. Donec sed neque eget</p>
        <div className="testimonial-footer">
            <div className='user'>
                <img src={userImage} alt="" />
                <div>
                    <span className='m-fontsize fw-500'>Robert Fox</span>
                    <span className='s-fontsize fw-400'>Customer</span>
                </div>

            </div>
            <div className="ratings">
                <img src={starIcon} alt="star" />
                <img src={starIcon} alt="star" />
                <img src={starIcon} alt="star" />
                <img src={starIcon} alt="star" />
                <img src={starIcon} alt="star" />
            </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <img src={quoteIcon} alt="" />
        <p className='t-fontsize fw-400'>Pellentesque eu nibh eget mauris congue mattis mattis nec tellus. Phasellus imperdiet elit eu magna dictum, bibendum cursus velit sodales. Donec sed neque eget</p>
        <div className="testimonial-footer">
            <div className='user'>
                <img src={userImage} alt="" />
                <div>
                    <span className='m-fontsize fw-500'>Robert Fox</span>
                    <span className='s-fontsize fw-400'>Customer</span>
                </div>

            </div>
            <div className="ratings">
                <img src={starIcon} alt="star" />
                <img src={starIcon} alt="star" />
                <img src={starIcon} alt="star" />
                <img src={starIcon} alt="star" />
                <img src={starIcon} alt="star" />
            </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <img src={quoteIcon} alt="" />
        <p className='t-fontsize fw-400'>Pellentesque eu nibh eget mauris congue mattis mattis nec tellus. Phasellus imperdiet elit eu magna dictum, bibendum cursus velit sodales. Donec sed neque eget</p>
        <div className="testimonial-footer">
            <div className='user'>
                <img src={userImage} alt="" />
                <div>
                    <span className='m-fontsize fw-500'>Robert Fox</span>
                    <span className='s-fontsize fw-400'>Customer</span>
                </div>

            </div>
            <div className="ratings">
                <img src={starIcon} alt="star" />
                <img src={starIcon} alt="star" />
                <img src={starIcon} alt="star" />
                <img src={starIcon} alt="star" />
                <img src={starIcon} alt="star" />
            </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <img src={quoteIcon} alt="" />
        <p className='t-fontsize fw-400'>Pellentesque eu nibh eget mauris congue mattis mattis nec tellus. Phasellus imperdiet elit eu magna dictum, bibendum cursus velit sodales. Donec sed neque eget</p>
        <div className="testimonial-footer">
            <div className='user'>
                <img src={userImage} alt="" />
                <div>
                    <span className='m-fontsize fw-500'>Robert Fox</span>
                    <span className='s-fontsize fw-400'>Customer</span>
                </div>

            </div>
            <div className="ratings">
                <img src={starIcon} alt="star" />
                <img src={starIcon} alt="star" />
                <img src={starIcon} alt="star" />
                <img src={starIcon} alt="star" />
                <img src={starIcon} alt="star" />
            </div>
        </div>
      </SwiperSlide>

      </Swiper>
    </>
    </section>
  )
}

export default Testimonials
