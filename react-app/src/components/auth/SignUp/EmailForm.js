import React, { useRef } from "react";
import "./SignUpForm.css"


const EmailForm = ({ formData, setFormData }) => {

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
      </div>
      <label className="checkbox-wrapper"> MEOWMEOWMEOW
        <input type="checkbox" />
        <span className="checkmark"></span>
      </label>
    </div>
  )
}

export default EmailForm;
