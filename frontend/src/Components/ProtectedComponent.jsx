import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom'
import { handleRedirect } from '../features/user/userSlice';

const ProtectedComponent = ({Component}) => {

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  let currentPage = location.pathname;

  const {login} = useSelector(state=>state.userReducer.user);
  const {redirect} = useSelector(state=>state.userReducer);

  const routesForLoginUsers = ['/account', '/account/dashboard', '/account/orders', '/account/setting', '/checkout']

  const routesProhibitForLoginUsers = ['/signin', '/register']


  const redirectUser = () =>{


    //Clean Page Url for Exact matching..
    const lastCharOfPage = currentPage[currentPage.length-1];

    if( lastCharOfPage === '/'){
      currentPage = currentPage.substring(0, currentPage.length-1);
    }

    //Redirect according to query
    if(login === true && redirect!== ''){
      navigate(redirect);
      setTimeout(() => {
        dispatch(handleRedirect(""));
      }, 5000);
    }

    //Redirect for Logout users
    if(login === false && routesForLoginUsers.includes(currentPage)){
      navigate('/');
    }

    //Redirect for Login users
    if(login === true && routesProhibitForLoginUsers.includes(currentPage)){
      navigate('/account');
    }

    let cartCount = JSON.parse(localStorage.getItem('cart'))
    cartCount = cartCount ? cartCount.length : 0

    if(cartCount === 0 && currentPage === '/checkout'){
      navigate('/shop');
    }

  }

  useEffect(()=>{

    redirectUser();
  
  }, [currentPage, login, redirect]);

  return (
    <>
      <Component/>  
    </>
  )
}

export default ProtectedComponent
