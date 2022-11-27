import React from "react";
import "./SignUpForm.css"


const EmailForm = ({ formData, setFormData }) => {
  return (
      <div className='signup-input-box'>
        <input
          type='text'
          name='email'
          value={formData?.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
        />
        <label htmlFor='email'>EMAIL</label>
      </div>
  )
}

export default EmailForm;
