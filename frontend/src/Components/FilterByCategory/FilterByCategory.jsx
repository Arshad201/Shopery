import { useEffect, useState } from 'react';
import arrow from '../../assets/icons/filter-arrow.svg';
import radioIcon from '../../assets/icons/radio.svg';
import radioIconActive from '../../assets/icons/active-radio.svg';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategory } from '../../features/product/productActions';
import { productQueryHandler } from '../../features/product/productSlice';


const FilterByCategory = () => {
    

  const dispatch = useDispatch();
  const {status, data} = useSelector(state=>state.productReducer.categories);
  const {productQueries} = useSelector(state=>state.productReducer);
  const [viewCat, setViewCat] = useState(true);

  useEffect(()=>{
    dispatch(getAllCategory());
  }, []);

  return (
    <div className="filter-item">
    <div className="xl-fontsize fw-500" onClick={()=>setViewCat(!viewCat)}>All Categories <img src={arrow} alt="" style={{transform: `${viewCat ? 'rotate(0deg)': 'rotate(180deg)'}`}} /></div>
    {viewCat && <div className="categories-list">

        {
            status === 'loading' && <>Loading...</>
        }
        {
            status === 'success' && 
            data?.map((i)=><div className="category" key={i._id} onClick={()=>dispatch(productQueryHandler({...productQueries, category: i.categoryName}))}>
                {productQueries.category === i.categoryName ? <img src={radioIconActive} alt="" /> : <img src={radioIcon} alt="" /> }
                <p className="s-fontsize fw-400">{i.categoryName}</p>
            </div>)
        }
        
    </div>}
</div>
  )
}

export default FilterByCategory
