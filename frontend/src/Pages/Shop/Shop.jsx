//CSS
import "./Shop.css";

//Required Hooks and Functions
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from "../../features/product/productActions";

// Icons
import filterIcon from '../../assets/icons/filter.svg';
import sortArrow from '../../assets/icons/sort-arrow.svg';

//Components
import PageHeader from '../../Components/PageHeader/PageHeader.jsx';
import ProductCardSM from '../../Components/ProductCardSM/ProductCardSM';
import ProductCard from '../../Components/ProductCard/ProductCard';
import Pagination from '../../Components/Pagination/Pagination.jsx';
import FilterByCategory from "../../Components/FilterByCategory/FilterByCategory.jsx";
import FilterByPriceRange from "../../Components/FilterByPriceRange/FilterByPriceRange.jsx";
import FilterByRatings from "../../Components/FilterByRatings/FilterByRatings.jsx";
import ProductCardSkeleten from "../../Components/Skeleton/ProductCardSkeleten/ProductCardSkeleten";
import { productQueryHandler } from "../../features/product/productSlice.js";


const Shop = () => {

    const [showFilter, setShowFilter] = useState(true);
    const [viewSort, setViewSort] = useState(false);
    const {productQueries} = useSelector(state=>state.productReducer);

    //Query Object for search
    // const [queries, setQueries] = useState({actionType: 'shopProducts', resultPerPage: 15, currentPage: 1});
    
    const sortBy = ['Latest', 'Price low to high'];

    const dispatch = useDispatch();
    
    const { status, data, productTotals, pages } = useSelector((state)=>state.productReducer.products.shopProducts);
  
    useEffect(()=>{
  
        let timer = setTimeout(() => {
            dispatch(getProducts(productQueries));
        }, 500);

        return ()=>clearTimeout(timer);
  
    }, [productQueries]);


  return (
    <>
      <PageHeader/>
      <section className="shop">
        <div className="sidebar">
            <button className="btn" onClick={()=>setShowFilter(!showFilter)}>Filter <img src={filterIcon} alt="" /></button>
            {showFilter && <div className="filter-items">
                <FilterByCategory/>
                <FilterByPriceRange/>
                <FilterByRatings/>
            </div>}
        </div>
        <div className="main-shop">
            <div className="sorting-results">
                <div className="sorting">
                    <span className="m-fontsize fw-400">Sort by: </span>
                    <div className="m-fontsize fw-400 sorted-value" style={{overflow: `${!viewSort ? 'hidden': 'visible'}`}} onClick={()=>setViewSort(!viewSort)}>{productQueries.sortBy} <img src={sortArrow} alt="" />
                    <div className={`sorting-list ${viewSort ? 'sorting-on' : 'sorting-off'}`}>
                        {sortBy.map((item)=><span key={item} className={`item ${item === productQueries.sortBy && 'active'}`} onClick={()=>dispatch(productQueryHandler({...productQueries, sortBy: item}))}>{item}</span>)}
                    </div>
                    </div>
                </div>
                <div className="result m-fontsize fw-400"><span className="fw-600">
                    {productTotals}</span> Results Found {productQueries.searchingKeyword && `for "${productQueries.searchingKeyword}"`}
                </div>
            </div>
            <div className="product-grid">
                {status === 'loading' ? 
                <>
                <ProductCardSkeleten /> 
                <ProductCardSkeleten /> 
                <ProductCardSkeleten /> 
                <ProductCardSkeleten /> 
                <ProductCardSkeleten /> 
                <ProductCardSkeleten /> 
                <ProductCardSkeleten /> 
                </>: 
                data.map((product)=><ProductCard product={product} key={product._id}/>)}
            </div>
            {pages > 1 && <Pagination pages={pages} currentPage={queries.currentPage} queries={queries} setQueries={setQueries}/>}
        </div>
      </section>
      {/* <Modal/> */}
    </>
  )
}

export default Shop
