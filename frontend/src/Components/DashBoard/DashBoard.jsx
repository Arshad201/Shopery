import  './DashBoard.css';
import profileImg from '../../assets/images/profile-img.png';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const DashBoard = ({setPage}) => {

  const { status:ordersStatus, data } = useSelector(state=>state.userReducer.myOrders);
  const {data:user, status} = useSelector(state=>state.userReducer.user);

  
  return (
    <div className='dashboard' >
      {status === 'success' && <div className="profile-billing-wrapper">
        <div className="profile-box">
          <div className="profile-img-box">
            <img src={user.avatar?.url} alt="profile" />
          </div>
          <h2 className="xl-fontsize fw-500">{user.firstName} {user.lastName}</h2>
          <span className="s-fontsize fw-400">{user.role}</span>
          <Link to={'/account/setting'} className="m-fontsize fw-500" >Edit Profile</Link>
        </div>
        {user.billingInfo && <div className="billing-add-box">
          <span className="s-fontsize fw-400">Billing Address</span>
          <h3 className="l-fontsize fw-500">{user.billingInfo.firstName} {user.billingInfo.lastName}</h3>
          <span className="s-fontsize fw-400">
          {user.billingInfo.streetAddress} 
          {user.billingInfo.state} &nbsp;
          {user.billingInfo.country} &nbsp;
          {user.billingInfo.zipCode}
          </span>
          <span className="m-fontsize fw-400">{user.billingInfo.email}</span>
          <span className="m-fontsize fw-400">{user.billingInfo.phoneNumber}</span>
          <Link className="m-fontsize fw-500" to={'/account/setting#billing'}>Edit Address</Link>
        </div>}
      </div>}
      <div className="orders-table">
        <div>
          <h3 className="xl-fontsize fw-500">Recent Order History</h3>
          {ordersStatus === 'success' && <Link className="m-fontsize fw-500" to={'/account/orders'}>{data.length > 5 && 'View All'}</Link>}
        </div>
        <table>
          <thead>
            <tr >
                {
                (ordersStatus === 'success' && data.length >=1) ? <>
                <th className='s-fontsize fw-500'>ORDER ID</th>
                <th className='s-fontsize fw-500'>DATE</th>
                <th className='s-fontsize fw-500'>TOTAL</th>
                <th className='s-fontsize fw-500'>ordersStatus</th>
                <th className='s-fontsize fw-500'></th>
                </>
                :
                <th className='m-fontsize fw-600 notFoundTxt'>No Order Found!</th>
                }
            </tr>
          </thead>
          <tbody>
            {
              ordersStatus === 'loading' && <>loading...</>
            }
            {

            ordersStatus === 'success' &&  data?.map((order)=>{
                return  <tr key={order._id}>
                <td className='s-fontsize fw-400'>{order._id.slice(0, 7)}...</td>
                <td className='s-fontsize fw-400'>{order.orderDate}</td>
                <td className='s-fontsize fw-500'>${order.paymentInfo.totalPrice} ({order.orderItems.length} Products)</td>
                <td className='s-fontsize fw-400'>{order.orderordersStatus}</td>
                <td className='s-fontsize fw-500'><Link to={`/account/orders/${order._id}`} onClick={()=>setPage('vo')}>View Details</Link></td>
              </tr>
              })
            }
            
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DashBoard
