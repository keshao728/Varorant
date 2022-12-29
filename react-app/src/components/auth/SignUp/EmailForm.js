import React, { useRef } from "react";
import "./SignUpForm.css"


const EmailForm = ({ email, setEmail, errors}) => {


  return (
    <div>

      <div className='signup-input-box'>
        <input
          type='text'
          name='email'
          required
          value={email}
          onChange={(e) =>
            {setEmail(e.target.value)}
          }
        />
        <label htmlFor='email'>EMAIL</label>
        {!!errors?.email && (
          // console.log("EEEEEEEEROR IN EMAIL FORM", errors),
          <div className='sign-in-error'>
            <img className="caution" src="https://imgur.com/E1p7Fvo.png" alt="Error Message" />
            {/* {errors?.filter(error => error.includes("email"))} */}
            {errors.email && <div>{errors.email}</div>}
          </div>
        )}
      </div>
      <label className="checkbox-wrapper"> I allow Meowit Games to use my personal information
        <input type="checkbox" />
        <span className="checkmark"></span>
      </label>
    </div>
  )
}

export default EmailForm;
