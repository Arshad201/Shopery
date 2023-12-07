import { Link } from 'react-router-dom'
import Pagination from '../Pagination/Pagination'
import { useSelector } from 'react-redux';

const OrderHistory = ({setPage}) => {

  const { status, data } = useSelector(state=>state.userReducer.myOrders);
  
  return (
    <div className="orders-table">
        <div>
          <h3 className="xl-fontsize fw-500">Order History</h3>
        </div>
        <table>
          <thead>
            <tr >
            {
                data.length >=1 ? <>
                <th className='s-fontsize fw-500'>ORDER ID</th>
                <th className='s-fontsize fw-500'>DATE</th>
                <th className='s-fontsize fw-500'>TOTAL</th>
                <th className='s-fontsize fw-500'>STATUS</th>
                <th className='s-fontsize fw-500'></th>
                </>
                :
                <th className='m-fontsize fw-600 notFoundTxt'>No Order Found!</th>
                }
            </tr>
          </thead>
          <tbody>
          {
              status === 'loading' ? <>loading...</>
              :
              data?.map((order)=>{
                
                return  <tr key={order._id}>
                <td className='s-fontsize fw-400'>{order._id.slice(0, 7)}...</td>
                <td className='s-fontsize fw-400'>{order.orderDate}</td>
                <td className='s-fontsize fw-500'>${order.paymentInfo.totalPrice} ({order.orderItems.length} Products)</td>
                <td className='s-fontsize fw-400'>{order.orderStatus}</td>
                <td className='s-fontsize fw-500'><Link to={`/account/orders/${order._id}`} onClick={()=>setPage('vo')}>View Details</Link></td>
              </tr>
              })
            }
          </tbody>
        </table>
        <div>
            {/* <Pagination pages={6} currentPage={1}/> */}
        </div>
      </div>
  )
}

export default OrderHistory
