import React from "react";
import "./SignUpForm.css"

// const onSignUp = async (e) => {
//   e.preventDefault();
//   if (password === repeatPassword) {
//     const data = await dispatch(signUp(username, email, password));
//     if (data) {
//       setErrors(data)
//     }
//   }
// };

const PasswordForm = ({ formData, setFormData }) => {
  return (
    <div>
      <div className='signup-input-box'>
        <input
          type='password'
          name='password'
          required
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        ></input>
        <label>PASSWORD</label>
      </div>
      <div className='signup-input-box'>
        <input
          type='password'
          name='repeat_password'
          value={formData.repeatPassword}
          required
          onChange={(e) =>
            setFormData({ ...formData, repeatPassword: e.target.value })
          }
        ></input>
        <label>CONFIRM PASSWORD</label>
      </div>
    </div>
  )
}
export default PasswordForm;
