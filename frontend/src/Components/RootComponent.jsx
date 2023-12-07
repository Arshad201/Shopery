import {SkeletonTheme} from 'react-loading-skeleton';
import { Outlet } from 'react-router-dom';
import Header from './Header/Header.jsx';
import Footer from './Footer/Footer.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
// import { cartCount } from '../features/SingleValues/singleValSlice.js';
import AlertModal from './Modal/AlertModal.jsx';
import { loadMyProfile } from '../features/user/userAction.js';
import QuestionModal from './Modal/QuestionModal.jsx';
import { handleUserAlert } from '../features/user/userSlice.js';
import { cartCount } from '../features/product/productSlice.js';
import SearchModal from './Modal/SearchModal.jsx';
import ProductModal from './Modal/ProductModal.jsx';
import RatingModal from './Modal/RatingModal.jsx';
import AvatarModal from './Modal/AvatarModal.jsx';

const RootComponent = () => {

  const dispatch = useDispatch();

  const {productModal, searchModal, ratingModal, avatarModal } = useSelector(state=>state.productReducer);
  const { questionModal, alert } = useSelector(state=>state.userReducer)

  useEffect(()=>{
    dispatch(cartCount());
    dispatch(loadMyProfile());
  },[]);

  useEffect(()=>{
    setTimeout(() => {
      dispatch(handleUserAlert({show: false}))
    }, 3000);
  }, [alert.msg]);
  return (
    <SkeletonTheme baseColor="#e9e7e8" highlightColor="#dedede" >
      <Header/>
      {productModal && <ProductModal/>}
      {searchModal && <SearchModal/>}
      {ratingModal && <RatingModal/>}
      {avatarModal && <AvatarModal/>}
      {alert.show && <AlertModal alertMsg={alert.msg} type={alert.type}/>}
      {questionModal.show && <QuestionModal question={questionModal.question}/>}
      <Outlet/>
      <Footer/>
    </SkeletonTheme>
  )
}

export default RootComponent
