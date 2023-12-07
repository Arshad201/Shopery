import PageHeader from '../../Components/PageHeader/PageHeader';
import DashBoard from '../../Components/DashBoard/DashBoard.jsx';
import OrderHistory from '../../Components/OrderHistory/OrderHistory.jsx';
import Settings from '../../Components/Settings/Settings.jsx';
import OrderDetails from '../../Components/OrderDetails/OrderDetails.jsx';
import  './Account.css';
import { Link, useLocation } from 'react-router-dom';
import dashboardIcon from '../../assets/icons/dashboard.svg';
import historyIcon from '../../assets/icons/history.svg';
import heartIcon from '../../assets/icons/heart-md.svg';
import cartIcon from '../../assets/icons/cart-md.svg';
import settingsIcon from '../../assets/icons/settings.svg';
import logoutIcon from '../../assets/icons/logout.svg';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { avatarClientHanlder, handleQuestionModal } from '../../features/user/userSlice';
import { myOrders } from '../../features/user/userAction';
import profileImg from '../../assets/images/user-avatar.png';


const Account = () => {

  const dispatch = useDispatch();
  const {data:user, status} = useSelector(state=>state.userReducer.user);

  const location = useLocation();
  const arrayOfLocation = location.pathname.split("/").filter((i)=>i!=='');
  const currentPage = arrayOfLocation[arrayOfLocation.length-1];
  const [selectedNavigation, SetSelectedNavigation] = useState('dash');
  
  useEffect(()=>{

    // console.log(currentPage.length);
    if(currentPage === 'dashboard') SetSelectedNavigation('dash');
    if(currentPage.length === 24) SetSelectedNavigation('vo');
    if(currentPage === 'orders') SetSelectedNavigation('oh');
    if(currentPage === 'setting') SetSelectedNavigation('s');

    dispatch(myOrders());

      if(status === 'success' && user.avatar.url === 'example_url'){
          dispatch(avatarClientHanlder(profileImg))
      }

  },[currentPage, status]);
  return (
    <>
    <PageHeader/>
    
    <section className='account'>
      <div className="sidebar">
        <h3 className="xxl-fontsize fw-500">Navigation</h3>
        <Link to={'/account/dashboard'} className={`link m-fontsize fw-400 ${selectedNavigation === 'dash' && 'active'}`}  onClick={()=>SetSelectedNavigation('dash')}>
          <img src={dashboardIcon} alt='dashboard' />
          <span> Dashboard</span>
        </Link>

        <Link to='/account/orders' className={`link m-fontsize fw-400 ${(selectedNavigation === 'oh'|| selectedNavigation === 'vo')  && 'active'}`} onClick={()=>SetSelectedNavigation('oh')}>
          <img src={historyIcon} alt='dashboard' />
          <span>Order History</span>
        </Link>

        <Link className={`link m-fontsize fw-400`} to={'/wishlist'} onClick={()=>SetSelectedNavigation('w')}>
          <img src={heartIcon} alt='dashboard' />
          <span>Wishlist</span>
        </Link>

        <Link className={`link m-fontsize fw-400`} to={'/cart'} onClick={()=>SetSelectedNavigation('c')}>
          <img src={cartIcon} alt='dashboard' />
          <span>Shopping Cart</span>
        </Link>

        <Link to='/account/setting' className={`link m-fontsize fw-400 ${selectedNavigation === 's' && 'active'}`} onClick={()=>SetSelectedNavigation('s')}>
          <img src={settingsIcon} alt='dashboard' />
          <span>Settings</span>
        </Link>

        <Link className={`link m-fontsize fw-400`} onClick={()=>dispatch(handleQuestionModal({show: true, question: 'Are you sure to Logout'}))}>
          <img src={logoutIcon} alt='dashboard' />
          <span>Logout</span>
        </Link>
      </div>
      <div className="main">
        {selectedNavigation === 'dash' && <DashBoard setPage={SetSelectedNavigation}/>}
        {selectedNavigation === 'oh' && <OrderHistory setPage={SetSelectedNavigation}/>}
        {selectedNavigation === 's' && <Settings setPage={SetSelectedNavigation}/>}
        {selectedNavigation === 'vo' && <OrderDetails setPage={SetSelectedNavigation} />}
      </div>
    </section>
    </>
  )
}

export default Account
