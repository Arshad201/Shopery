import { Link, useNavigate, useParams } from 'react-router-dom';
import  './OrderDetails.css';
import orderRecieved from '../../assets/icons/order-received.svg';
import productImg from '../../assets/images/wishlistItem.png';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { myOrderDetails } from '../../features/user/userAction';

const OrderDetails = ({setPage}) => {


  const dispatch = useDispatch();
  const params = useParams();
  const { status, data } = useSelector(state=>state.userReducer.myOrderDetails);
  let productCount = data.orderItems?.length;

//   const  = data.billingInfo;

  useEffect(()=>{

    dispatch(myOrderDetails(params.id));

  },[]);

  return (
    <section className='order-details'>
        {
            status === 'loading' &&
            <>Loading</>
        }
        {
            status === 'success' &&
            <> 
                <div className="order-details-header">
                    <div>
                        <span className="xl-fontsize fw-500">Order Details</span>
                        <span className="dot"></span>
                        <span className="s-fontsize fw-400">{data.orderDate}</span>
                        <span className="dot"></span>
                        <span className="s-fontsize fw-400">{productCount} Product{productCount > 1 && 's'}</span>
                    </div>
                    <div className="m-fontsize fw-500" onClick={()=>setPage('oh')}>Back to List</div>
                </div>
                <div className="order-details-body1">
                    <div className="wrapper three-box">
                        <div className="billing-shipping-wrapper">
                            <div className="billing-container">
                                <h5 className="m-fontsize fw-500 heading">Billing Address</h5>
                                <div className="row">
                                    <span className="m-fontsize fw-400">{data.billingInfo.firstName} {data.billingInfo.lastName}</span>
                                    <span className="s-fontsize fw-400">
                                        {data.billingInfo.streetAddress} {data.billingInfo.state} {data.billingInfo.country} {data.billingInfo.zipCode}
                                    </span>
                                </div>
                                <div className="row">
                                    <span className="s-fontsize fw-400">Email</span>
                                    <span className="s-fontsize fw-400">{data.billingInfo.email}</span>
                                </div>
                                <div className="row">
                                    <span className="s-fontsize fw-400">Phone</span>
                                    <span className="s-fontsize fw-400">{data.billingInfo.phoneNumber}</span>
                                </div>
                            </div>
                            <div className="shipping-container">
                            <h5 className="m-fontsize fw-500 heading">Shipping Address</h5>
                                <div className="row">
                                    <span className="m-fontsize fw-400">{data.billingInfo.firstName} {data.billingInfo.lastName}</span>
                                    <span className="s-fontsize fw-400">{data.billingInfo.streetAddress} {data.billingInfo.state} {data.billingInfo.country} {data.billingInfo.zipCode}</span>
                                </div>
                                <div className="row">
                                    <span className="s-fontsize fw-400">Email</span>
                                    <span className="s-fontsize fw-400">{data.billingInfo.email}</span>
                                </div>
                                <div className="row">
                                    <span className="s-fontsize fw-400">Phone</span>
                                    <span className="s-fontsize fw-400">{data.billingInfo.phoneNumber}</span>
                                </div>
                            </div>
                        </div>
                        <div className='orderInfo'>
                            <div className="header">
                                <div>
                                    <span className="s-fontsize fw-500">Order ID:</span>
                                    <span className="s-fontsize fw-400">{data._id.slice(0, 5)}...</span>
                                </div>
                                <div className="line"></div>
                                <div>
                                    <span className="s-fontsize fw-500">Payment Method:</span>
                                    <span className="s-fontsize fw-400">{data.paymentInfo.paymentType}</span>
                                </div>
                            </div>
                            <div className="row">
                                <span className="s-fontsize fw-400">Subtotal:</span>
                                <span className="s-fontsize fw-500">${data.paymentInfo.totalPrice-data.paymentInfo.shippingPrice}</span>
                            </div>
                            <div className="row">
                                <span className="s-fontsize fw-400">Discount</span>
                                <span className="s-fontsize fw-500">0%</span>
                            </div>
                            <div className="row">
                                <span className="s-fontsize fw-400">Shipping</span>
                                <span className="s-fontsize fw-500">${data.paymentInfo.totalPrice - (data.paymentInfo.totalPrice-data.paymentInfo.shippingPrice)}</span>
                            </div>
                            <div className="row">
                                <span className="l-fontsize fw-400">Total</span>
                                <span className="l-fontsize fw-600">${data.paymentInfo.totalPrice}</span>
                            </div>
                        </div>
                    </div>
                    <div className="order-scale">
                        <div className="scale">
                            <div className={`green-metre ${data.orderStatus == 'Order received' && 'scale-30'}`}></div>
                        </div>
                        <div className="scale-content">
                            <div className={`order-received done`}>
                                <div className='circle'>
                                    <img src={orderRecieved} alt="order-received" />
                                </div>
                                <span className="s-fontsize fw-400">Order received</span>
                            </div>
                            <div className={`processing ${data.orderStatus == 'processing' && 'done'}`}>
                                <div className='circle'>
                                    02
                                </div>
                                <span className="s-fontsize fw-400">Processing</span>
                            </div>
                            <div className={`ontheway  ${data.orderStatus == 'ontheway' && 'done'}`}>
                                <div className='circle'>
                                    03
                                </div>
                                <span className="s-fontsize fw-400">On the way</span>
                            </div>
                            <div className={`delivered  ${data.orderStatus == 'delivered' && 'done'}`}>
                                <div className='circle'>
                                    04
                                </div>
                                <span className="s-fontsize fw-400">Delivered</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="order-details-product-chart">
                    <div className="chart-heading">
                        <span className="s-fontsize fw-500">Product</span>
                        <span className="s-fontsize fw-500">Price</span>
                        <span className="s-fontsize fw-500">Quantity</span>
                        <span className="s-fontsize fw-500">Subtotal</span>
                    </div>
                    {data.orderItems?.map((product)=><div className="row" key={product._id}>
                        <div className="product" key={product.productId}>
                            <img src={product.image} alt="" />
                            <span className="s-fontsize fw-400">{product.name}</span>
                        </div>
                        <div className="s-fontsize fw-400">${product.price}</div>
                        <div className="s-fontsize fw-400">x{product.quantity}</div>
                        <div className="s-fontsize fw-500">${product.price * product.quantity}</div>
                    </div>)}
                </div>
            </>
        }
       
    </section>
  )
}

export default OrderDetails
