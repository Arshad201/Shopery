import './Product.css';
import { useEffect, useState } from 'react';
import ProductShortInfo from '../../Components/ProductShortInfo/ProductShortInfo'
import ProductLongInfo from '../../Components/ProductLongInfo/ProductLongInfo.jsx'
import PageHeader from '../../Components/PageHeader/PageHeader';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleProduct } from '../../features/product/productActions';

const Product = () => {

  const [selectedNav, setSelectedNav] = useState('desc');
  const dispatch = useDispatch();
  const { data, status } = useSelector((state)=>state.productReducer.products.singleProduct)
  const params = useParams();
  const id = params.id;

  useEffect(()=>{

    dispatch(getSingleProduct(id));

  },[]);

  return (
    <section className='product-page'>
        <PageHeader/>
        <div className="wrapper">
          {status === 'succeed' && <ProductShortInfo data={data} setNav={setSelectedNav}/>}
        </div>
        <div className="navigation">
            <button className={`s-fontsize fw-500 ${selectedNav === 'desc' && 'active'}`} onClick={()=>setSelectedNav('desc')} >Descriptions</button>
            <button className={`s-fontsize fw-500 ${selectedNav === 'ainfo' && 'active'}`} onClick={()=>setSelectedNav('ainfo')} >Additional Information</button>
            <button className={`s-fontsize fw-500 ${selectedNav === 'cf' && 'active'}`} onClick={()=>setSelectedNav('cf')} >Customer Feedback</button>
        </div>
        {status === 'succeed' && <ProductLongInfo selectedNav={selectedNav} data={data}/>}
    </section>
  )
}

export default Product
