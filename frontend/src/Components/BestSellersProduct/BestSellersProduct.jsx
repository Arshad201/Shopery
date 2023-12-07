import ProductCard from '../ProductCard/ProductCard.jsx';
import BtnArrow from '../../assets/icons/green-arrow.svg';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getProducts } from '../../features/product/productActions.js';

const BestSellersProduct = () => {

  const dispatch = useDispatch();
  const { status, data } = useSelector((state)=>state.productReducer.products.bestSellersProducts);

  useEffect(()=>{

    let isMounted = true;
    
    if(status === 'idle'){
      
      dispatch(getProducts({actionType: 'bestSellersProducts', searchingKeyword: 'app', resultPerPage: 4}))

    }

    //Cleanup Function
    return ()=>{
      isMounted = false;
    }

  }, [dispatch, status]);

  return (
    <section className='featured-product-section'>
      <div className='section-header-1'>
        <h3 className="heading3">Best Seller Products</h3>
        <Link className="m-fontsize fw-500">View All <img src={BtnArrow} alt="view all" /></Link>
      </div>
      <div className="product-row">
      {status === 'loading' ? <h1>Loading...</h1> : 
        data.map((product)=><ProductCard product={product} key={product._id}/>)}
      </div>
    </section>
  )
}

export default BestSellersProduct
