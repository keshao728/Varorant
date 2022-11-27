import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../../store/session';
import EmailForm from './EmailForm'
import UsernameForm from './UsernameForm'
import PasswordForm from './PasswordForm'

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
      return <EmailForm formData={formData} setFormData={setFormData} />
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

      <form onSubmit={onSignUp}>
        {/* <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div> */}
        <div>
          <h1>{FormTitles[page]}</h1>
        </div>
        <div>{FormDescriptions[page]}</div>
        <div>{PageDisplay()}</div>
        <div>
          {page === FormTitles.length - 1 ?
            <button type='submit'>Sign Up</button>
            : <button onClick={() => setPage((currPage) => currPage + 1)}>Next</button>
          }
        </div>
      </form>
    </div>

  );
};

export default SignUpForm;
