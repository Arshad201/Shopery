import { useState } from 'react';
import arrow from '../../assets/icons/filter-arrow.svg';
import Slider from '@mui/material/Slider';
import { productQueryHandler } from '../../features/product/productSlice';
import { useDispatch, useSelector } from 'react-redux';

const FilterByPriceRange = () => {
    
    const [viewPrice, setViewPrice] = useState(true);
    const [value, setValue] = useState([0, 1000]);
    const {productQueries} = useSelector(state=>state.productReducer);
    const dispatch = useDispatch();

    const handleChange =(event, newValue)=>{
      // setQueries({...queries, minPrice: newValue[0], maxPrice: newValue[1]});
      setValue(newValue)
      dispatch(productQueryHandler({...productQueries, minPrice: newValue[0], maxPrice: newValue[1] }));
      
    }

  return (
    <div className="filter-item">
        <div className="xl-fontsize fw-500" onClick={()=>setViewPrice(!viewPrice)}>Price<img src={arrow} alt="" style={{transform: `${viewPrice ? 'rotate(0deg)': 'rotate(180deg)'}`}} /></div>
        {viewPrice && 
        <>
            <Slider
            getAriaLabel={() => 'Price range'}
            value={value}
            onChange={handleChange}
            valueLabelDisplay="auto"
            min={0}
            max={1000}
            color="secondary"
            />
        <div className="price-value m-fontsize fw-400">Price: <span className="fw-500">{value[0]}—{value[1]}</span></div>
        </>
        }
    </div>
  )
}

export default FilterByPriceRange
