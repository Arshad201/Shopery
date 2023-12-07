import { Link } from 'react-router-dom';
import PageHeader from '../../Components/PageHeader/PageHeader';
import './register.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerAction } from '../../features/user/userAction';
import btnLoader from '../../assets/icons/btn-loader.png';


const Register = () => {

  const dispatch = useDispatch();
  const {status} = useSelector(state=>state.userReducer.user);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");

  const registerHandler = (e) =>{

    e.preventDefault();

    const obj = {
      email,
      password,
      cPassword
    }

    dispatch(registerAction(obj));
  }

  
  return (
    <section className='register'>
      <PageHeader/>
      <div className="wrapper">
        <form onSubmit={registerHandler}>
            <h2 className="heading5">Register</h2>
            <input className='s-fontsize fw-400' type="email" name="email" placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)} />
            <input className='s-fontsize fw-400' type="password" name="password" placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)} />
            <input className='s-fontsize fw-400' type="password" name="password" placeholder='Confirm Password' value={cPassword} onChange={(e)=>setCPassword(e.target.value)} />
            <button className='btn' type='submit'>
            {status === 'loading' && <img src={btnLoader} />}
              Create Account</button>
            <div className='s-fontsize fw-400'>Already have account? <Link className='s-fontsize' to='/signin' > Login</Link></div>
        </form>
      </div>
    </section>
  )
}

export default Register
