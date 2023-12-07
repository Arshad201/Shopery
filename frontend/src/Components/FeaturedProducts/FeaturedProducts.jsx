import "./FeaturedProducts.css";
import ProductCardSkeleten from '../Skeleton/ProductCardSkeleten/ProductCardSkeleten.jsx';
import ProductCard from '../ProductCard/ProductCard.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";
import { getProducts } from "../../features/product/productActions";

const FeaturedProducts = () => {

  const dispatch = useDispatch();
  const { status, data } = useSelector((state)=>state.productReducer.products.featuredProducts);


  useEffect(()=>{

    let isMounted = true;
    
    if(status === 'idle'){
      
      dispatch(getProducts({actionType: 'featuredProducts', featured: true, resultPerPage: 4}))

    }

    return ()=>{
      isMounted = false;
    }

  }, [dispatch, status]);

  return (
    <section className='featured-product-section'>
      <div className='section-header-1'>
        <h3 className="heading3">Featured Products</h3>
      </div>
      <div className="product-row">
        {status === 'loading' &&
        <>
        <ProductCardSkeleten /> 
        <ProductCardSkeleten /> 
        <ProductCardSkeleten /> 
        <ProductCardSkeleten /> 
        </>
      }
        {
          status === 'succeed' &&
          data.map((product)=><ProductCard product={product} key={product._id}/>)
        }
      </div>
    </section>
  )
}

export default FeaturedProducts
