import './Modal.css';
import close from '../../assets/icons/close.svg';
import { useDispatch, useSelector } from 'react-redux';
import { handleModal, productQueryHandler } from '../../features/product/productSlice';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchModal = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState("");
    const {productQueries} = useSelector(state=>state.productReducer);
  
    const searchHandler = (e) =>{
      e.preventDefault();
      dispatch(productQueryHandler({...productQueries, searchingKeyword: keyword}))
      dispatch(handleModal({show: false, modalType: 'searchModal'}))
      navigate('/shop');
    }
  
  return (
    <div className='quick-view-modal'>
    <div className="modal">
      <img src={close} alt="close" className='closeModal' 
      onClick={()=>dispatch(handleModal({show: false, modalType: 'searchModal'}))}/>
      <form onSubmit={searchHandler}>
        <input type="text" placeholder='Search a keyword' onChange={(e)=>setKeyword(e.target.value)} />
        <button className="btn">Search</button>
      </form>
    </div>
  </div>
  )
}

export default SearchModal
