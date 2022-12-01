import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, NavLink } from 'react-router-dom';
import { signUp } from '../../../store/session';
import EmailForm from './EmailForm'
import UsernameForm from './UsernameForm'
import PasswordForm from './PasswordForm'
import logo from '../../Navigation/NavImages/logo.png'
import "./SignUpForm.css"

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [page, setPage] = useState(0);
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    repeatPassword: '',
  })
  const [usernameErr, setUsernameErr] = useState('')
  const [emailErr, setEmailErr] = useState('')
  const [passwordErr, setPasswordErr] = useState('')
  // const [repeatPasswordErr, setRepeatPasswordErr] = useState('')

  const [formSubmitted, setFormSubmitted] = useState(false)


  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const FormTitles = ["What's your email?", "Choose a username", "Choose a password"]
  const FormDescriptions = ["", "Used for sign in to all our games.", "Make sure it's a good one."]




  const isDisabled = () => {
    if (page === 0 && formData.email === '') {
      return <button disabled={true}></button>
    } else if (page === 1 && formData.username === '') {
      return <button disabled={true}></button>
    } else {
      <button disabled={false}> </button>
    }
  }

  // const submitDisabled = () => {
  //   if (!formData.password || !formData.repeatPassword) {
  //     return <button disabled={true}></button>
  //   } else {
  //     <button disabled={false}> </button>
  //   }
  // }

  // const err = {};



  const onSignUp = async (e) => {
    e.preventDefault();
    setFormSubmitted(true)

    if (usernameErr && emailErr && passwordErr) {
      const data = await dispatch(signUp(formData.username, formData.email, formData.password));
      if (data) {
        setErrors(data);
        // for (let error of data) {
        //   if (error.startsWith('email')) setEmailErr('Email address is already in use')
        //   if (error.startsWith('username')) setUsernameErr('Username is already in use')
        //   if (!!emailErr) {
        //     setPage(0)

        //     const response = await fetch('/api/auth/check-email')
        //     if (Object.values(response).includes('avaliable')) {
        //       setEmailErr('')
        //     }
        //   } else if (!!usernameErr) {
        //     setPage(1)
        //     if (!usernameErr) setUsernameErr("")
        //   }
        // }
      }
    }
  };



  // const err = {};
  // useEffect(async () => {
  //   if (formData.username.length > 15) err.username = 'Username must be less than 15 characters'
  //   if (formData.username.length < 3) err.username = 'Username must be at least 3 characters'
  //   if (!formData.email.toLowerCase().match(/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,63})$/)) err.email = 'Please provide a valid email'
  //   if (formData.password !== formData.repeatPassword) err.password = 'Passwords must match'
  //   if (formData.password.length < 6) err.password = 'Password must be at least 6 characters'
  //   if (formData.password.length > 20) err.password = 'Password length must not exceed 20 characters'
  //   setErrors(err)
  //   return err
  // }, [formData.username, formData.email, formData.password, formData.repeatPassword])

  useEffect(async () => {
    // if (formData.password === formData.repeatPassword) setPasswordErr('Password must match')
    if (!formData.email.toLowerCase().match(/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,63})$/)) setEmailErr('Please enter a valid email')
    if (formData.username.length > 15) setUsernameErr('Username must be less than 15 characters')
    if (formData.username.length < 3) setUsernameErr('Username must be at least 3 characters')
    if (formData.password !== formData.repeatPassword) setPasswordErr('Passwords must match')
    if (formData.password.length < 6) setPasswordErr('Password must be at least 6 characters')
    if (formData.password.length > 20) setPasswordErr('Password length must not exceed 20 characters')


    for (let error of errors) {
      if (error.startsWith('email')) setEmailErr('Email address is already in use')
      if (error.startsWith('username')) setUsernameErr('Username is already in use')
      if (!!emailErr) {
        // setPage(0)

        if (!emailErr) setEmailErr('')
        // const response = await fetch('/api/auth/check-email')
        // if (Object.values(response).includes('avaliable')) {
        //   setEmailErr('')
        // }
      } else if (!!usernameErr) {
        // setPage(1)
        if (!usernameErr) setUsernameErr("")
      } else {
        if (!passwordErr) setPasswordErr('')
      }
    }
  }, [formData.username, formData.email, formData.password, formData.repeatPassword])


  const PageDisplay = () => {
    if (page === 0) {
      return <div>
        <EmailForm formData={formData} setFormData={setFormData} emailErr={emailErr} formSubmitted={formSubmitted} />
        <div>
          <NavLink className="signup-redirect" to="/login"> ALREADY HAVE AN ACCOUNT? </NavLink>
        </div>
      </div>
    } else if (page === 1) {
      return <UsernameForm formData={formData} setFormData={setFormData} usernameErr={usernameErr} formSubmitted={formSubmitted} />
    } else {
      return <PasswordForm formData={formData} setFormData={setFormData} passwordErr={passwordErr} formSubmitted={formSubmitted}/>
    }
  }

  console.log("EEEEEEEE", errors)
  console.log("EEEEEEMAIL ERROREE", emailErr)
  console.log("USERNAME ERRRRR", usernameErr)

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='signup-form-mother'>
      <div className='signup-links-pages'>
        <div
          className="signup-individual-pages"
          onClick={() => setPage(0)}
          style={page === 0 ? { backgroundColor: "#FF4654" } : null}
        >
        </div>
        <div
          className="signup-individual-pages"
          onClick={() => setPage(1)}
          style={page === 1 ? { backgroundColor: "#FF4654" } : null}
        >
        </div>
        <div
          className="signup-individual-pages"
          onClick={() => setPage(2)}
          style={page === 2 ? { backgroundColor: "#FF4654" } : null}
        >
        </div>
      </div>
      <div className='signup-logo'>
        <NavLink to='/' exact={true} className="singup-link-home" activeClassName='active'>
          <div className='signup-home'>
            <div className="signup-home-logo" >
              <img className='signup-home-individual-logo' src={logo} />
            </div>
            <div className='signup-home-name'>MEOWIT GAMES</div>
          </div>
        </NavLink>
      </div>
      <div className='signup-page-text'> CREATE AN ACCOUNT </div>
      {/* <div className='progress-wrapper'>
      </div> */}
      <form onSubmit={onSignUp}>
        <div className='signup-form-wrapper'>
          <div className="signup-form-child">
            <div className='signup-mes-des'>
              <div className='signup-message'>{FormTitles[page]}</div>
              <div className='signup-description'>{FormDescriptions[page]}</div>
            </div>

            <div>
              {PageDisplay()}
            </div>

            <div>
              {page === FormTitles.length - 1 ?
                <button
                  disabled={!formData.password || !formData.repeatPassword}
                  className='submit-signup-button' type='submit'>
                  <i class="fa-solid fa-arrow-right"></i>
                </button>
                : <button
                  onClick={() => setPage((currPage) => currPage + 1)}
                  className='submit-signup-button'
                  disabled={isDisabled()}
                >
                  <i class="fa-solid fa-arrow-right"></i>
                </button>
              }
            </div>
          </div>
        </div>
      </form>
    </div>

  );
};

export default SignUpForm;
