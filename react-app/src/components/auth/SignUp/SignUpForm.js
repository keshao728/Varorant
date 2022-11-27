import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, NavLink } from 'react-router-dom';
import { signUp } from '../../../store/session';
import EmailForm from './EmailForm'
import UsernameForm from './UsernameForm'
import PasswordForm from './PasswordForm'
import "./SignUpForm.css"

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  // const [username, setUsername] = useState('');
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [repeatPassword, setRepeatPassword] = useState('');
  const [page, setPage] = useState(0);
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    repeatPassword: '',
  })

  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const FormTitles = ["What's your email?", "Choose a username", "Choose a password"]
  const FormDescriptions = ["", "Used for sign in to all our games.", "Make sure it's a good one."]


  const PageDisplay = () => {
    if (page === 0) {
      return <div>
        <EmailForm formData={formData} setFormData={setFormData} />
        <div>
          <NavLink className="signup-redirect" to="/login"> ALREADY HAVE AN ACCOUNT? </NavLink>
        </div>
      </div>
    } else if (page === 1) {
      return <UsernameForm formData={formData} setFormData={setFormData} />
    } else {
      return <PasswordForm formData={formData} setFormData={setFormData} />
    }
  }

  const onSignUp = async (e) => {
    e.preventDefault();
    if (formData.password === formData.repeatPassword) {
      const data = await dispatch(signUp(formData.username, formData.email, formData.password));
      if (data) {
        setErrors(data)
      }
    }
  };


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
        <NavLink className="signup-homepage" to={`/`} exact={true} activeClassName='active'>
          Riot Games
        </NavLink>
      </div>
      {/* <div className='progress-wrapper'>
      </div> */}
      <form onSubmit={onSignUp}>
        <div className='signup-form-wrapper'>
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
                <button className='submit-signup-button' type='submit'>
                  <i class="fa-solid fa-arrow-right"></i>
                </button>
                : <button
                  onClick={() => setPage((currPage) => currPage + 1)}
                  className='submit-signup-button'>
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
