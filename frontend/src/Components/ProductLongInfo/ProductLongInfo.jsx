import './ProductLongInfo.css';

import checkIcon from '../../assets/icons/circle-check.svg';
import playBtn from '../../assets/icons/play.svg';

import moment from 'moment';

import discountIcon from '../../assets/icons/discount-tag.svg';
import leafIcon from '../../assets/icons/leaf.svg';
import starIcon from '../../assets/icons/full-star.svg';
import thumbnailImage from '../../assets/images/thumbnailImage.png';
import { useDispatch } from 'react-redux';
  
import { handleModal } from '../../features/product/productSlice.js';


const ProductLongInfo = ({selectedNav, data}) => {


  const dispatch = useDispatch();
  const discount = data.additionalInfo.discount;
  const additionalInfo = data.additionalInfo;


  return (
    <div className="longInfo" >
      {selectedNav === 'desc' && <div className="description">
        <div className="content">
            <p className="s-fontsize fw-400">
                {data.longDesc.para1}
            <br/><br/>
                {data.longDesc.para2}
            </p>
            <ul>
                {data.longDesc.longDescList?.map((i, index)=><li key={index} className='s-fontsize fw-400'><img src={checkIcon} alt="o" />{i}</li>)}
            </ul>
            <p className="s-fontsize fw-400">{data.longDesc.para3}</p>
        </div>
        <div className="video-container">
            <div className="video-box">
                {/* <video src=""></video> */}
                <img src={thumbnailImage} alt="" className="thumbnail" />
                <img className='playBtn' src={playBtn} alt="play" />
            </div>
            <div className="card-container">
                {discount > 0 && <div className="card">
                    <img src={discountIcon} alt="discount" />
                    <div>
                        <p className="s-fontsize fw-600">{discount}% Discount</p>
                        <p className="s-fontsize fw-400">Save your {discount}% money with us</p>
                    </div>
                </div>}
                <div className="card">
                    <img src={leafIcon} alt="discount" />
                    <div>
                        <p className="s-fontsize fw-600">100% Organic</p>
                        <p className="s-fontsize fw-400">100% Organic Vegetables</p>
                    </div>
                </div>
            </div>
        </div>
      </div>}
      {selectedNav === 'ainfo' && <div className="additional-info">
        <div className="content">
            <div className="row">
                <span className="s-fontsize fw-400">Weight:</span>
                <span className="s-fontsize fw-400">{additionalInfo.weight}</span>
            </div>
            <div className="row">
                <span className="s-fontsize fw-400">Color:</span>
                <span className="s-fontsize fw-400">{additionalInfo.color}</span>
            </div>
            <div className="row">
                <span className="s-fontsize fw-400">Type:</span>
                <span className="s-fontsize fw-400">{additionalInfo.type}</span>
            </div>
            <div className="row">
                <span className="s-fontsize fw-400">Category:</span>
                <span className="s-fontsize fw-400">{additionalInfo.category}</span>
            </div>
            <div className="row">
                <span className="s-fontsize fw-400">Stock Status:</span>
                <span className="s-fontsize fw-400">Available ({additionalInfo.stock})</span>
            </div>
            <div className="row">
                <span className="s-fontsize fw-400">Tags:</span>
                <span className="s-fontsize fw-400">Vegetables, Healthy, Chinese, Cabbage, Green Cabbage</span>
            </div>
        </div>
        <div className="video-container">
            <div className="video-box">
                {/* <video src=""></video> */}
                <img src={thumbnailImage} alt="" className="thumbnail" />
                <img className='playBtn' src={playBtn} alt="play" />
            </div>
            <div className="card-container">
            {discount > 0 && <div className="card">
                    <img src={discountIcon} alt="discount" />
                    <div>
                        <p className="s-fontsize fw-600">{discount}% Discount</p>
                        <p className="s-fontsize fw-400">Save your {discount}% money with us</p>
                    </div>
                </div>}
                <div className="card">
                    <img src={leafIcon} alt="discount" />
                    <div>
                        <p className="s-fontsize fw-600">100% Organic</p>
                        <p className="s-fontsize fw-400">100% Organic Vegetables</p>
                    </div>
                </div>
            </div>
        </div>
      </div>}
      {selectedNav === 'cf' && <div className="customer-feedback">
        <div className="feedback-container" id='feedback' >
            {
                data.reviews?.map((i)=>{
                    return  <div className="feedback" key={i._id}>
                                <div className='user-img-name-wrapper'>
                                    <div className='user-img-box'>
                                        <img src={i.user.avatar?.url} alt="user" />
                                    </div>
                                    <div className='user-name-rating'>
                                        <span className="s-fontsize fw-500">{i.user.firstName} {i.user.lastName}</span>
                                        <div className="ratings">
                                            <img className={`${i.rating < 1 && 'unfilledStar'}`} src={starIcon} alt="star"  />
                                            <img className={`${i.rating < 2 && 'unfilledStar'}`} src={starIcon} alt="star"  />
                                            <img className={`${i.rating < 3 && 'unfilledStar'}`} src={starIcon} alt="star"  />
                                            <img className={`${i.rating < 4 && 'unfilledStar'}`} src={starIcon} alt="star"  />
                                            <img className={`${i.rating < 5 && 'unfilledStar'}`} src={starIcon} alt="star"  />
                                        </div>
                                    </div>
                                    <span className="time s-fontsize fw-400">{moment(i.commentDate).from()}</span>
                                </div>
                                <p className="s-fontsize fw-400">{i.comment}</p>
                            </div>
                })
            }
            {/* <button className="btn">Load more</button> */}
            <button className="btn" onClick={()=>dispatch(handleModal({show: true, modalType: 'ratingModal'}))} >Add a Feedback</button>
        </div>
      </div>}
    </div>
  )
}

export default ProductLongInfo
