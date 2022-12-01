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

const PasswordForm = ({ password, setPassword, repeatPassword, setRepeatPassword, errors}) => {
  return (
    <div>
      <div className='signup-input-box'>
        <input
          type='password'
          name='password'
          required
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        ></input>
        <label>PASSWORD</label>
      </div>
      <div className='signup-input-box'>
        <input
          type='password'
          name='repeat_password'
          value={repeatPassword}
          required
          onChange={(e) =>
           setRepeatPassword(e.target.value)
          }
        ></input>
        <label>CONFIRM PASSWORD</label>
        {errors.password && <div>{errors.password}</div>}
        {errors.repeatPassword && <div>{errors.repeatPassword}</div>}
      </div>
    </div>
  )
}
export default PasswordForm;
