import { Link, useLocation, useNavigate } from 'react-router-dom';
import PageHeader from '../../Components/PageHeader/PageHeader';
import './SignIn.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signin } from '../../features/user/userAction';
import btnLoader from '../../assets/icons/btn-loader.png';
import { handleRedirect, handleUserAlert } from '../../features/user/userSlice';

const SignIn = () => {

  const {status} = useSelector(state=>state.userReducer.user);
  const dispatch = useDispatch();
  const location = useLocation();
  const [email, setEmail] = useState("arshad78@mail.com");
  const [password, setPassword] = useState("12345678");

  const loginHandler = (e) =>{

    e.preventDefault();
    const redirectPage = location.search.split("=")[1];

    const userData = {
      email,
      password,
      redirectPage
    }

    dispatch(signin(userData));
    dispatch(handleUserAlert({show: true, type: "success", msg: "Logged in successfully!"}));
    if(redirectPage!==undefined) dispatch(handleRedirect(`/${redirectPage}`));
    
  }

  return (
    <section className='signIn'>
      <PageHeader/>
      <div className="wrapper">
        <form>
            <h2 className="heading5">Sign In</h2>
            <input className='s-fontsize fw-400' type="email" name="email" placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)} />
            <input className='s-fontsize fw-400' type="password" name="password" placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <div>
            </div>
            <button className='btn' type='submit' onClick={(e)=>loginHandler(e)}>
              {status === 'loading' && <img src={btnLoader} />}Login
              </button>
            <div className='s-fontsize fw-400'>Don’t have account? <Link className='s-fontsize' to='/register' >Register</Link></div>
        </form>
      </div>
    </section>
  )
}

export default SignIn
