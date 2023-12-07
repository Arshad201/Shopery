import './Modal.css';
import close from '../../assets/icons/close.svg';
import starIcon from '../../assets/icons/full-star.svg';
import { useDispatch, useSelector } from 'react-redux';
import { handleModal } from '../../features/product/productSlice';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createFeedback } from '../../features/product/productActions';
import { handleUserAlert } from '../../features/user/userSlice';

const RatingModal = () => {

    const prams = useParams();
    const dispatch = useDispatch();
    const { data} = useSelector((state)=>state.productReducer.products.singleProduct);
    const { _id:myId } = useSelector((state)=>state.userReducer.user.data);
    const { reviews } = data;
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
  
    const submitFeedback = (e) =>{
  
      e.preventDefault();
  
      const dataObj = {
        rating,
        comment,
        productId: prams.id
      }
  
      dispatch(createFeedback(dataObj));
      dispatch(handleUserAlert({type: 'success', msg: 'Feedback added!', show: true}))
  
    }
  
    const setRatings = () =>{
      const filteredReview = reviews.filter((i)=>i.user._id == myId);
      if(filteredReview.length > 0){
        setRating(filteredReview[0].rating)
        setComment(filteredReview[0].comment)
      }
    }
  
    useEffect(()=>{
        setRatings();
    }, []);
    
  return (
    <div className='quick-view-modal'>
    <div className="modal">
      <img src={close} alt="close" className='closeModal' 
      onClick={
        ()=>dispatch(handleModal({show: false, modalType: 'ratingModal'}))}/>
        <div className="ratingModal">
          <div className="star-container">
            <img className={`${rating < 1 && 'unfilledStar'}`} src={starIcon} alt="star" onClick={()=>setRating(prev=>prev < 1 ? 1 : 0)} />

            <img className={`${rating < 2 && 'unfilledStar'}`} src={starIcon} alt="star" onClick={()=>setRating(prev=>prev < 2 ? 2 : 1)} />

            <img className={`${rating < 3 && 'unfilledStar'}`} src={starIcon} alt="star" onClick={()=>setRating(prev=>prev < 3 ? 3 : 2)} />

            <img className={`${rating < 4 && 'unfilledStar'}`} src={starIcon} alt="star" onClick={()=>setRating(prev=>prev < 4 ? 4 : 3)} />

            <img className={`${rating < 5 && 'unfilledStar'}`} src={starIcon} alt="star" onClick={()=>setRating(prev=>prev < 5 ? 5 : 4)} />
          </div>
          <form className="comment-form" onSubmit={submitFeedback}>
              <label htmlFor="commentInput" className='s-fontsize fw-400'>Add your Comment below!</label>
              <textarea name="commentInput" id="commentInput" cols="30" rows="5" placeholder='Tell us about the product...' value={comment} onChange={(e)=>setComment(e.target.value)}></textarea>
              <button className="btn">Add a Feedback</button>
          </form>
        </div>
    </div>
  </div>
  )
}

export default RatingModal
