import './Reliable.css';

import truckIcon from '../../assets/icons/truck.svg';
import headphonesIcon from '../../assets/icons/headphones.svg';
import bagIcon from '../../assets/icons/shopping-bag.svg';
import packIcon from '../../assets/icons/package.svg';

const Reliable = () => {
  return (
    <section className='reliable-container'>
      <div className="reliable-card-container">
        <div className="reliable-card">
            <div>
                <img src={truckIcon} alt="free shipping" />
            </div>
            <h2 className='l-fontsize fw-600'>Free Shipping</h2>
            <p className='s-fontsize fw-400'>Free shipping with discount</p>
        </div>
        <div className="reliable-card">
            <div>
                <img src={headphonesIcon} alt="free shipping" />
            </div>
            <h2 className='l-fontsize fw-600'>Great Support 24/7</h2>
            <p className='s-fontsize fw-400'>Instant access to Contact</p>
        </div>
        <div className="reliable-card">
            <div>
                <img src={bagIcon} alt="free shipping" />
            </div>
            <h2 className='l-fontsize fw-600'>100% Sucure Payment</h2>
            <p className='s-fontsize fw-400'>We ensure your money is save</p>
        </div>
        <div className="reliable-card">
            <div>
                <img src={packIcon} alt="free shipping" />
            </div>
            <h2 className='l-fontsize fw-600'>Money-Back Guarantee</h2>
            <p className='s-fontsize fw-400'>30 days money-back</p>
        </div>
      </div>
      <div className="line">
        <hr />
      </div>
    </section>
  )
}

export default Reliable
