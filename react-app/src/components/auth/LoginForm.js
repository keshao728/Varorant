import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Navigate } from 'react-router-dom';
import { login } from '../../store/session';
import logo from '../Navigation/NavImages/logo.png'
import './LoginForm.css';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  // let err = []
  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
    // if (data) {
    //   for (let error of data) {
    //     if (error.startsWith('email')) err.email = "Invalid email"
    //     if (error.startsWith('password')) err.password = 'Invalid password'
    //     setErrors(err)
    //   }
    //   console.log("THIS IS MAI ERROR", err)
    //   return err
    // }
  };


  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <div className='login-form-mother'>
      <div className='login-logo'>
        <NavLink to='/' exact={true} className="singin-link-home" activeClassName='active'>
          <div className='signin-home'>
            <div className="signin-home-logo" >
              <img className='signin-home-individual-logo' src={logo} alt="Site Logo" />
            </div>
            <div className='signin-home-name'>MEOWIT GAMES</div>
          </div>
        </NavLink>
      </div>
      <form onSubmit={onLogin}>
        <div className='login-form-wrapper'>
          <div className='login-form-child'>
            <div className='login-message'> Sign In </div>
            <div className='login-input-box'>
              <input
                name='email'
                type='text'
                value={email}
                onChange={updateEmail}
                required
              />
              <label htmlFor='email'>EMAIL</label>
            </div>
            {!!errors.length && (
              <div className='sign-in-error'>
                <img className="caution" src="https://imgur.com/E1p7Fvo.png" alt="Error Message" />
                {errors.filter(error => error.includes("email"))}
              </div>
            )}
            <div className='login-input-box'>
              <input
                name='password'
                type='password'
                value={password}
                onChange={updatePassword}
                required
              />
              <label htmlFor='password'>PASSWORD</label>
            </div>
            {!!errors.length && (
              <div className='sign-in-error'>
                <img className="caution" src="https://imgur.com/E1p7Fvo.png" alt="Error Message" />
                {errors.filter(error => error.includes("password"))}
              </div>
            )}
            <div className="demo-user">
              <div className="demo-1-wrap">
                <button className='demo-login-button'
                  id='demo-2'
                  type="submit"
                  onClick={() => {
                    setEmail("marnie@aa.io")
                    setPassword("password")
                  }}>
                  <i className="fa-regular fa-user"></i>
                  <div className="demo-login-overlay-2">Demo User 1</div>

                </button>
              </div>

              <div className="demo-1-wrap">
                <button className='demo-login-button'
                  id='demo-1'
                  type="submit"
                  onClick={() => {
                    setEmail("demo@aa.io")
                    setPassword("password")
                  }}>
                  <i className="fa-solid fa-user"></i>
                  <div className="demo-login-overlay-1">Demo User 2</div>
                </button>
              </div>
            </div>
            <div className='submit-login-wrapper'>
              <button className='submit-login-button' type='submit' disabled={!email || !password}>
                <i class="fa-solid fa-arrow-right"></i>
              </button>
            </div>
            <div>
              <NavLink className="login-redirect" to="/sign-up"> CREATE ACCOUNT </NavLink>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
