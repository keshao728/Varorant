import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import './LoginForm.css';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='login-form-mother'>
      <div className='login-logo'>
        <NavLink className="login-homepage" to={`/`} exact={true} activeClassName='active'>
          Riot Games
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
            <div>{errors.email}</div>
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
            <div className="demo-user">
              <button className='demo-login-button'
                id='demo-2'
                type="submit"
                onClick={() => {
                  setEmail("marnie@aa.io")
                  setPassword("password")
                }}>
                <i class="fa-regular fa-user"></i>
              </button>
              <button className='demo-login-button'
                id='demo-1'
                type="submit"
                onClick={() => {
                  setEmail("demo@aa.io")
                  setPassword("password")
                }}>
                <i class="fa-solid fa-user"></i>
              </button>
            </div>
            <div className='submit-login-wrapper'>
              <button className='submit-login-button' type='submit'>
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
