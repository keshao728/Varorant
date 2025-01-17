import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, Navigate } from 'react-router-dom';
import { signUp } from '../../../store/session';
import EmailForm from './EmailForm'
import UsernameForm from './UsernameForm'
import PasswordForm from './PasswordForm'
import logo from '../../Navigation/NavImages/logo.png'
import "./SignUpForm.css"

const SignUpForm = () => {
  const [errors, setErrors] = useState({});
  const [page, setPage] = useState(0);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const FormTitles = ["What's your email?", "Choose a username", "Choose a password"]
  const FormDescriptions = ["", "Used for sign in to all our games.", "Make sure it's a good one."]
  const [displayErrors, setDisplayErrors] = useState(false);


  const isDisabled = () => {
    if (page === 0 && email === '') {
      return <button disabled={true}></button>
    } else if (page === 1 && username === '') {
      return <button disabled={true}></button>
    } else {
      <button disabled={false}> </button>
    }
  }

  const validate = () => {
    let err = {}
    if (!email.toLowerCase().match(/^([a-z0-9_.-]+)@([\da-z.-]+)\.([a-z.]{2,63})$/)) {
      err.email = 'Please provide a valid email'
      setPage(0)
    }
    if (username.length > 15) {
      setPage(1)
      err.username = 'Username must be less than 15 characters'
    } else if (username.length < 3) {
      setPage(1)
      err.username = 'Username must be at least 3 characters'
    }

    if (password !== repeatPassword) {
      err.repeatPassword = 'Passwords must match'
      setPage(2)
    }
    if (password.length < 6) {
      setPage(2)
      err.password = 'Password must be at least 6 characters'
    } else if (password.length > 20) {
      err.password = 'Password length must not exceed 20 characters'
      setPage(2)
    }
    setErrors(err)

    if (Object.values(err).length) {
      setDisplayErrors(true)
    }
    return err
  }



  const onSignUp = async (e) => {
    e.preventDefault();

    if (!Object.values(errors).length) {
      setErrors({})
      setDisplayErrors(false)
      let validationErrors = validate()
      if (Object.values(validationErrors).length) return


      if (!Object.values(validationErrors).length) {
        if (password === repeatPassword) {
          const data = await dispatch(signUp(username, email, password))
          if (data) {
            let err = {}
            for (let error of data) {
              console.log(error);
              if (error.startsWith('email')) {
                setPage(0)
                err.email = "Email address is already in use"
              }
              if (error.startsWith('username')) {
                setPage(1)
                err.username = "Username is already in use"
              }
            }
            setErrors(err)
          }
        }
      }
    }
    return errors
  };

  useEffect(() => {
    if (displayErrors) validate()
  }, [setErrors, username, email, password, repeatPassword, displayErrors])

  const PageDisplay = () => {
    if (page === 0) {
      return <div>
        <EmailForm email={email} setEmail={setEmail} errors={errors} />
        <div>
          <NavLink className="signup-redirect" to="/login"> ALREADY HAVE AN ACCOUNT? </NavLink>
        </div>
      </div>
    } else if (page === 1) {
      return <UsernameForm username={username} setUsername={setUsername} errors={errors} />
    } else {
      return <PasswordForm password={password} setPassword={setPassword} repeatPassword={repeatPassword} setRepeatPassword={setRepeatPassword} errors={errors} />
    }
  }



  if (user) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <div className='signup-form-mother'>
      <div className='signup-logo'>
        <NavLink to='/' exact={true} className="singup-link-home" activeClassName='active'>
          <div className='signup-home'>
            <div className="signup-home-logo" >
              <img className='signup-home-individual-logo' src={logo} alt="Site Logo" />
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
          <div className="signup-form-child">
            {/* <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
          </div> */}
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
                  disabled={!password || !repeatPassword || Object.values(errors).length}
                  className='submit-signup-button' type='submit'>
                  <i className="fa-solid fa-arrow-right"></i>
                </button>
                : <button
                  onClick={() => { setPage((currPage) => currPage + 1); setErrors({}) }}
                  className='submit-signup-button'
                  disabled={isDisabled()}
                >
                  <i className="fa-solid fa-arrow-right"></i>
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
