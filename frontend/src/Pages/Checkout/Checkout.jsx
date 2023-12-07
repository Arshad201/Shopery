import { useEffect, useState } from 'react';
import PageHeader from '../../Components/PageHeader/PageHeader';
import './Checkout.css';
import { getCartProducts } from '../../features/product/productActions';
import { useDispatch, useSelector } from 'react-redux';
import { placeOrder } from '../../features/user/userAction';
import { handleUserAlert } from '../../features/user/userSlice';

const Checkout = () => {


  const { error } = useSelector(state=>state.userReducer.placeOrder)
  const {billingInfo} = useSelector(state=>state.userReducer.user); 

  const [formData, setFormData] = useState({
    firstName: billingInfo.firstName ? billingInfo.firstName : "",
    lastName: billingInfo.lastName ? billingInfo.lastName : "",
    companyName: billingInfo.companyName ? billingInfo.companyName : "",
    streetAddress: billingInfo.streetAddress ? billingInfo.streetAddress : "",
    country: billingInfo.country ? billingInfo.country : "",
    state: billingInfo.state ? billingInfo.state : "",
    zipCode: billingInfo.zipCode ? billingInfo.zipCode : "",
    email: billingInfo.email ? billingInfo.email : "",
    phoneNumber: billingInfo.phoneNumber ? billingInfo.phoneNumber : "",
    orderNotes: ''
  });

  const [payment, setPayment] = useState("");

  const dispatch = useDispatch();
  const {data, status} = useSelector(state=>state.productReducer.products.cartProducts);

  const [shippingCharges, setShippingCharges] = useState(40);

  let total = 0
  data.forEach(product => {
      const productPrice = product.price - (product.price*product.additionalInfo.discount/100);
      const subTotal = productPrice*product.quantity;
      total = total + subTotal;
  });

  const handleInputChange=(e)=>{
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  }

  const orderPlaceHandler=(e)=>{

    e.preventDefault();

    if(payment === ""){
      dispatch(handleUserAlert({show: true, type: 'error', msg: 'Choose the Payment Method!'}))
      return;
    }

    //Filter the required properties of Product Item's Data before sending it to the server
    const preciseOrderItems = [];
    data.map((product)=>{
      const newProductObj = {
        productId: product._id,
        name: product.name,
        image: product.images[0].url,
        quantity: product.quantity,
        price: product.price
      }
      preciseOrderItems.push(newProductObj);
    });

    //Payment info Object
    const paymentInfo = {
        taxPrice: 0,
        shippingPrice: shippingCharges,
        totalPrice: total,
        paymentType: payment,
        paymentStatus: 'Pending'
    }

    //Now final data is ready
    const finalData = {
      billingInfo: formData,
      orderItems: preciseOrderItems,
      paymentInfo
    }

    //Place the Order using placeOrder (Action)
    dispatch(placeOrder(finalData));

  }

  useEffect(()=>{
    dispatch(getCartProducts());
  }, []);

  return (
    <section className='checkout'>
        <PageHeader/>
      <div className="checkout-wrapper">
        <div className="billing-info">
          <form>
            <h2 className="xxl-fontsize fw-500">Billing Information</h2>
            <div className="form-row">
              <div className="input-group">
                <label htmlFor="firstName" className='s-fontsize fw-400'>First name</label>
                <input type="text" name="firstName" id="firstName" placeholder='Your first name' value={formData.firstName}  onChange={(e)=>handleInputChange(e)}/>
                <span className="error-msg s-fontsize fw-400">{error.firstName}</span>
              </div>
              <div className="input-group">
                <label htmlFor="lastName" className='s-fontsize fw-400'>Last name</label>
                <input type="text" name="lastName" id="lastName" placeholder='Your last name' value={formData.lastName}  onChange={(e)=>handleInputChange(e)}/>
                <span className="error-msg s-fontsize fw-400">{error.lastName}</span>

              </div>
              <div className="input-group">
                <label htmlFor="companyName" className='s-fontsize fw-400'>Company name (Optional)</label>
                <input type="text" name="companyName" id="companyName" placeholder='Company name' value={formData.companyName} onChange={(e)=>handleInputChange(e)} />
              </div>
            </div>
            <div className="form-row">
              <div className="input-group">
                <label htmlFor="streetAddress" className='s-fontsize fw-400'>Street Address</label>
                <input type="text" name="streetAddress" id="streetAddress" placeholder='Street Address' value={formData.streetAddress}  onChange={(e)=>handleInputChange(e)}/>
                <span className="error-msg s-fontsize fw-400">{error.streetAddress}</span>

              </div>
            </div>
            <div className="form-row">
              <div className="input-group">
                <label htmlFor="country" className='s-fontsize fw-400'>Country/Region</label>
                <select name="country" id="country" value={formData.country}  onChange={(e)=>handleInputChange(e)}>
                  <option value="select">Select</option>
                  <option value="Australia">Australia</option>
                  <option value="United States">United States</option>
                </select>
                <span className="error-msg s-fontsize fw-400">{error.country}</span>

              </div>
              <div className="input-group">
                <label htmlFor="states" className='s-fontsize fw-400'>States</label>
                <select name="state" id="states" value={formData.state}  onChange={(e)=>handleInputChange(e)}>
                  <option value="sl">Select</option>
                  <option value="Au">Australia</option>
                  <option value="Us">United States</option>
                </select>
                <span className="error-msg s-fontsize fw-400">{error.state}</span>

              </div>
              <div className="input-group">
                <label htmlFor="zipCode" className='s-fontsize fw-400'>Zip Code</label>
                <input type="text" name="zipCode" id="zipcode" placeholder='Zip Code' value={formData.zipCode}  onChange={(e)=>handleInputChange(e)}/>
                <span className="error-msg s-fontsize fw-400">{error.zipCode}</span>

              </div>
            </div>
            <div className="form-row">
              <div className="input-group">
                <label htmlFor="email" className='s-fontsize fw-400'>Email</label>
                <input type="email" name="email" id="email" placeholder='Email Address' value={formData.email}  onChange={(e)=>handleInputChange(e)}/>
                <span className="error-msg s-fontsize fw-400">{error.email}</span>

              </div>
              <div className="input-group">
                <label htmlFor="phoneNumber" className='s-fontsize fw-400'>Phone</label>
                <input type="number" name="phoneNumber" id="phoneNumber" placeholder='Phone Number' value={formData.phoneNumber}  onChange={(e)=>handleInputChange(e)}/>
                <span className="error-msg s-fontsize fw-400">{error.phoneNumber}</span>

              </div>
            </div>
          </form>
          <form>
            <h2 className="xxl-fontsize fw-500">Additional Info</h2>
            <div className="form-row">
              <div className="input-group">
                <label htmlFor="orderNotes" className='s-fontsize fw-400'>Order Notes (Optional)</label>
                <textarea name="orderNotes" id="orderNotes" cols="30" rows="5" placeholder='Notes about your order, e.g. special notes for delivery' value={formData.orderNotes} onChange={(e)=>handleInputChange(e)}></textarea>
              </div>
            </div>
          </form>
        </div>
        <div className="order-summary">
          <div className="product-summary">
            <h2 className="xl-fontsize fw-500">Order Summery</h2>
            {data?.map((product)=><div key={product._id} className="product-row">
              <div>
                <img src={product.images[0].url} alt="" />
                <span className="s-fontsize fw-400">{product.name} x{product.quantity}</span>
              </div>
              <span className="s-fontsize fw-500">${product.price - product.price*product.additionalInfo.discount/100}</span>
            </div>)}
            <div className="row">
              <span className="s-fontsize fw-400">Subtotal:</span>
              <span className="s-fontsize fw-500">${total}</span>
            </div>
            <div className="row">
              <span className="s-fontsize fw-400">Shipping:</span>
              <span className="s-fontsize fw-500">{shippingCharges === 0 ? 'Free' : `+$${shippingCharges}`}</span>
            </div>
            <div className="row">
              <span className="m-fontsize fw-400">Total:</span>
              <span className="l-fontsize fw-500">${total+shippingCharges}</span>
            </div>
          </div>
          <div className="payment-method">
            <h2 className="xl-fontsize fw-500">Payment Method</h2>
            <form>
              <div className='radio-input-group'>
                <input type="radio" name="pay" id="cod" value={"COD"} onChange={(e)=>setPayment(e.target.value)} />
                <label className='s-fontsize fw-400' htmlFor="cod">
                  Cash on Delivery
                </label>
              </div>
              <div className='radio-input-group'>
                <input type="radio" name="pay" id="paypal" value={"Paypal"} onChange={(e)=>setPayment(e.target.value)} />
                <label className='s-fontsize fw-400' htmlFor="paypal">
                Paypal
                </label>
              </div>
              <div className='radio-input-group'>
                <input type="radio" name="pay" id="amazonPay" value={"Amazon Pay"} onChange={(e)=>setPayment(e.target.value)} />
                <label className='s-fontsize fw-400' htmlFor="amazonPay">
                Amazon Pay
                </label>
              </div>
            </form>
            <button className="btn" onClick={(e)=>orderPlaceHandler(e)}>Place Order</button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Checkout
