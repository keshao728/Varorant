import React from "react";
import "./SignUpForm.css"

const PasswordForm = ({ password, setPassword, repeatPassword, setRepeatPassword, errors }) => {
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
        {!!errors?.password && (
          <div>
            {errors.password &&
              <div className='sign-in-error'>
                <img className="caution" src="https://imgur.com/E1p7Fvo.png" alt="Error Message" />
                {errors.password}
              </div>
            }
            {errors.repeatPassword &&
              <div className='sign-in-error'>
                <img className="caution" src="https://imgur.com/E1p7Fvo.png" alt="Error Message"/>
                {errors.repeatPassword}
              </div>
            }
          </div>
        )}
      </div>
    </div>
  )
}
export default PasswordForm;
