import './Settings.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { accountSetting, billingSetting, passwordSetting } from '../../features/user/userAction';
import { handleModal } from '../../features/product/productSlice';
import btnLoader from '../../assets/icons/btn-loader.png';


const Settings = () => {


  const dispatch = useDispatch();
  const {data:user, status} = useSelector(state=>state.userReducer.user);
  const {account, billing, password} = useSelector(state=>state.userReducer.user.loading);
  const {billingInfo} = useSelector(state=>state.userReducer.user);


const [accountSettingData, setaccountSettingData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
});

  const [billingData, setBillingData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    streetAddress: "",
    country: "",
    state:"",
    zipCode: "",
    email:"",
    phoneNumber: "",
});

const [passwords, setPasswords] = useState({
    currentPassword: "",
    password: "",
    confirmPassword: ""
})

  const onaccountSettingDataChange = (e) =>{

    setaccountSettingData({...accountSettingData, [e.target.name]: e.target.value});
  }

  const onBillingDataChange = (e) =>{

    setBillingData({...billingData, [e.target.name]: e.target.value});

  }

  const onPasswordChange = (e) =>{

    setPasswords({...passwords, [e.target.name]: e.target.value});

  }

  const submitaccountSettingData = (e) =>{
    e.preventDefault();
    
    dispatch(accountSetting({...accountSettingData,  avatar: user.avatar}));
  }

  const submitbillingData = (e) =>{
    e.preventDefault();
    console.log(billingData);
    dispatch(billingSetting(billingData));
  }

  const submitPasswords = (e) =>{
    e.preventDefault();
    dispatch(passwordSetting(passwords));

    console.log(passwords);
  }
  
  const setDataOnRender = () =>{

    if(status === 'success'){

        setaccountSettingData({

            firstName: user.firstName ? user.firstName : "",
            lastName: user.lastName ? user.lastName : "",
            email: user.email ? user.email : "",
            phoneNumber: user.phoneNumber ? user.phoneNumber : "",
            
        });

        setBillingData({

            firstName: billingInfo.firstName ? billingInfo.firstName : "",
            lastName: billingInfo.lastName ? billingInfo.lastName : "",
            companyName: billingInfo.companyName ? billingInfo.companyName : "",
            streetAddress: billingInfo.streetAddress ? billingInfo.streetAddress : "",
            country: billingInfo.country ? billingInfo.country : "",
            state: billingInfo.state ? billingInfo.state : "",
            zipCode: billingInfo.zipCode ? billingInfo.zipCode : "",
            email: billingInfo.email ? billingInfo.email : "",
            phoneNumber: billingInfo.phoneNumber ? billingInfo.phoneNumber : "",
            
        })
    }
  }

  useEffect(()=>{
    setDataOnRender();
  }, [status]);
  
  return (
    <section className="settings">
        <div className="setting">
            <h3 className="xl-fontsize fw-500">Account Settings</h3>
            <div className="users-info-img-edit-wraper">
                <div className="user-info-edit-wrapper">
                    <form >
                        <div className="form-row">
                            <div className="input-group">
                                <label htmlFor="firstName" className='s-fontsize fw-400'>First Name</label>
                                <input type="text" name="firstName" id="firstName" placeholder='First Name' value={accountSettingData.firstName} onChange={(e)=>onaccountSettingDataChange(e)} />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="input-group">
                                <label htmlFor="lastName" className='s-fontsize fw-400'>Last Name</label>
                                <input type="text" name="lastName" id="lastName" placeholder='Last Name' value={accountSettingData.lastName} onChange={(e)=>onaccountSettingDataChange(e)}/>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="input-group">
                                <label htmlFor="email" className='s-fontsize fw-400'>Email</label>
                                <input type="email" name="email" id="email" placeholder='Email' value={accountSettingData.email} onChange={(e)=>onaccountSettingDataChange(e)} />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="input-group">
                                <label htmlFor="phone" className='s-fontsize fw-400'>Phone Number</label>
                                <input type="number" name="phoneNumber" id="phone" placeholder='Phone Number' value={accountSettingData.phoneNumber} onChange={(e)=>onaccountSettingDataChange(e)} />
                            </div>
                        </div>
                        <button className="btn" type="submit" onClick={(e)=>submitaccountSettingData(e)}>Save 
                        Changes
                        {account && <img className='lodingIcon' src={btnLoader} alt="" />}
                        </button>
                    </form>
                </div>
                <div className="user-img-update-wrapper">
                    <div>
                        <img src={user.avatar?.url} alt="profile-avatar" />
                    </div>
                    <button className="btn" onClick={()=>dispatch(handleModal({show: true, modalType: 'avatarModal'}))}>
                        Change Avatar
                    </button>
                </div>
            </div>
        </div>
        <div className="setting" id='billing'>
            <h3 className="xl-fontsize fw-500">Billing Address</h3>
            <div className="setting-form-wrapper">
                <form>
                    <div className="form-row">
                    <div className="input-group">
                        <label htmlFor="firstName" className='s-fontsize fw-400'>First name</label>
                        <input type="text" name="firstName" id="firstName" placeholder='Your first name' value={billingData.firstName} onChange={(e)=>onBillingDataChange(e)} />
                    </div>
                    <div className="input-group">
                        <label htmlFor="lastName" className='s-fontsize fw-400'>Last name</label>
                        <input type="text" name="lastName" id="lastName" placeholder='Your last name' value={billingData.lastName} onChange={(e)=>onBillingDataChange(e)} />
                    </div>
                    <div className="input-group">
                        <label htmlFor="companyName" className='s-fontsize fw-400'>Company name (Optional)</label>
                        <input type="text" name="companyName" id="companyName" placeholder='Company name' value={billingData.companyName} onChange={(e)=>onBillingDataChange(e)} />
                    </div>
                    </div>
                    <div className="form-row">
                    <div className="input-group">
                        <label htmlFor="streetAddress" className='s-fontsize fw-400'>Street Address</label>
                        <input type="text" name="streetAddress" id="streetAddress" placeholder='Street Address' value={billingData.streetAddress} onChange={(e)=>onBillingDataChange(e)} />
                    </div>
                    </div>
                    <div className="form-row">
                    <div className="input-group">
                        <label htmlFor="country" className='s-fontsize fw-400'>Country/Region</label>
                        <select name="country" id="country" value={billingData.country} onChange={(e)=>onBillingDataChange(e)}>
                        <option value="">Select</option>
                        <option value="au">Australia</option>
                        <option value="us">United States</option>
                        </select>
                    </div>
                    <div className="input-group">
                        <label htmlFor="states" className='s-fontsize fw-400'>States</label>
                        <select name="state" id="states" value={billingData.state} onChange={(e)=>onBillingDataChange(e)}>
                        <option value="">Select</option>
                        <option value="au">Australia</option>
                        <option value="us">United States</option>
                        </select>
                    </div>
                    <div className="input-group">
                        <label htmlFor="zipcode" className='s-fontsize fw-400'>Zip Code</label>
                        <input type="text" name="zipCode" id="zipcode" placeholder='Zip Code' value={billingData.zipCode} onChange={(e)=>onBillingDataChange(e)} />
                    </div>
                    </div>
                    <div className="form-row">
                    <div className="input-group">
                        <label htmlFor="email" className='s-fontsize fw-400'>Email</label>
                        <input type="email" name="email" id="email" placeholder='Email Address' value={billingData.email} onChange={(e)=>onBillingDataChange(e)}/>
                    </div>
                    <div className="input-group">
                        <label htmlFor="phoneNumber" className='s-fontsize fw-400'>Phone</label>
                        <input type="number" name="phoneNumber" id="phoneNumber" placeholder='Phone Number' value={billingData.phoneNumber} onChange={(e)=>onBillingDataChange(e)}/>
                    </div>
                    </div>
                    <button className="btn" onClick={(e)=>submitbillingData(e)} >
                        Save Changes
                        {billing && <img className='lodingIcon' src={btnLoader} alt="" />}
                    </button>
                </form>
            </div>
        </div>
        <div className="setting">
            <h3 className="xl-fontsize fw-500">Change Password</h3>
            <div className="setting-form-wrapper">
                <form>
                    <div className="form-row">
                        <div className="input-group">
                            <label htmlFor="currentPassword" className='s-fontsize fw-400'>Current Password</label>
                            <input type="text" name="currentPassword" id="currentPassword" placeholder='Your Current Password' value={passwords.currentPassword} onChange={(e)=>onPasswordChange(e)} />
                        </div>
                    </div>
                    <div className="form-row">
                    <div className="input-group">
                        <label htmlFor="password" className='s-fontsize fw-400'>Password</label>
                        <input type="text" name="password" id="password" placeholder='Password' value={passwords.password} onChange={(e)=>onPasswordChange(e)} />
                    </div>
                    <div className="input-group">
                        <label htmlFor="cPassword" className='s-fontsize fw-400'>Confirm Password</label>
                        <input type="text" name="confirmPassword" id="cPassword" placeholder='Confirm Password' value={passwords.confirmPassword} onChange={(e)=>onPasswordChange(e)} />
                    </div>
                    </div>
                    <button className="btn" onClick={(e)=>submitPasswords(e)}>
                        Save Changes
                        {password && <img className='lodingIcon' src={btnLoader} alt="" />}
                    </button>
                </form>
            </div>
        </div>
    </section>
  )
}

export default Settings
