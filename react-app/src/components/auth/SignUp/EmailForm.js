import React, { useRef } from "react";
import "./SignUpForm.css"


const EmailForm = ({ formData, setFormData, emailErr, formSubmitted }) => {


  return (
    <div>

      <div className='signup-input-box'>
        <input
          type='text'
          name='email'
          required
          value={formData?.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
        />
        <label htmlFor='email'>EMAIL</label>
        {!!emailErr.length && formSubmitted && (
          <div className='sign-in-error'>
            <img className="caution" src="https://imgur.com/E1p7Fvo.png" />
            {/* {errors.filter(error => error.includes("email"))} */}
            {emailErr}
            {/* {console.log("SHIBASHAKE IT", emailErr)} */}
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
