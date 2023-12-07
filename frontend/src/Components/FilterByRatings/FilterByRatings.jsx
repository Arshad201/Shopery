import { useState } from 'react';
import arrow from '../../assets/icons/filter-arrow.svg';
import checkBox from '../../assets/icons/checkBox.svg';
import checkedBox from '../../assets/icons/checkedbox.svg';
import star from '../../assets/icons/full-star.svg';
import { useDispatch, useSelector } from 'react-redux';
import { productQueryHandler } from '../../features/product/productSlice';

const FilterByRatings = () => {

    const dispatch = useDispatch();
    const [viewRating, setViewRating] = useState(true);
    const {productQueries} = useSelector(state=>state.productReducer);

  return (
    <div className="filter-item rating-filter">
    <div className="xl-fontsize fw-500" onClick={()=>setViewRating(!viewRating)}>Rating<img src={arrow} alt="" style={{transform: `${viewRating ? 'rotate(0deg)': 'rotate(180deg)'}`}} /></div>
    {viewRating && 
    <div className="ratings">
        <div className="rating">
            <img src={ productQueries.rating === 5 ? checkedBox : checkBox} onClick={()=>dispatch(productQueryHandler({...productQueries, rating: 5}))}  alt="uncheck"/>
            <div className="stars">
                <img className='star' src={star} alt="star" />
                <img className='star' src={star} alt="star" />
                <img className='star' src={star} alt="star" />
                <img className='star' src={star} alt="star" />
                <img className='star' src={star} alt="star" />
            </div>
            <div className="m-fontsize fw-400"> 5.0</div>
        </div>
        <div className="rating">
            <img  src={productQueries.rating === 4 ? checkedBox : checkBox} onClick={()=>dispatch(productQueryHandler({...productQueries, rating: 4}))}  alt="uncheck" />
            <div className="stars">
                <img className='star' src={star} alt="star" />
                <img className='star' src={star} alt="star" />
                <img className='star' src={star} alt="star" />
                <img className='star' src={star} alt="star" />
                <img className='emp-star' src={star} alt="star" />
            </div>
            <div className="m-fontsize fw-400"> 4.0 & up</div>
        </div>
        <div className="rating">
            <img  src={productQueries.rating === 3 ? checkedBox : checkBox} onClick={()=>dispatch(productQueryHandler({...productQueries, rating: 3}))}  alt="uncheck" />
            <div className="stars">
                <img className='star' src={star} alt="star" />
                <img className='star' src={star} alt="star" />
                <img className='star' src={star} alt="star" />
                <img className='emp-star' src={star} alt="star" />
                <img className='emp-star' src={star} alt="star" />
            </div>
            <div className="m-fontsize fw-400"> 3.0 & up</div>
        </div>
        <div className="rating">
            <img  src={productQueries.rating === 2 ? checkedBox : checkBox} onClick={()=>dispatch(productQueryHandler({...productQueries, rating: 2}))}  alt="uncheck"/>
            <div className="stars">
                <img className='star' src={star} alt="star" />
                <img className='star' src={star} alt="star" />
                <img className='emp-star' src={star} alt="star" />
                <img className='emp-star' src={star} alt="star" />
                <img className='emp-star' src={star} alt="star" />
            </div>
            <div className="m-fontsize fw-400"> 2.0 & up</div>
        </div>
        <div className="rating">
            <img  src={productQueries.rating === 1 ? checkedBox : checkBox} onClick={()=>dispatch(productQueryHandler({...productQueries, rating: 1}))}  alt="uncheck"/>
            <div className="stars">
                <img className='star' src={star} alt="star" />
                <img className='emp-star' src={star} alt="star" />
                <img className='emp-star' src={star} alt="star" />
                <img className='emp-star' src={star} alt="star" />
                <img className='emp-star' src={star} alt="star" />
            </div>
            <div className="m-fontsize fw-400"> 1.0 & up</div>
        </div>
    </div>                    
    }
</div>
  )
}

export default FilterByRatings
