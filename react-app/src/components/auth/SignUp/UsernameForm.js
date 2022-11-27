import React from "react";
import "./SignUpForm.css"

const UsernameForm = ({ formData, setFormData }) => {
  return (
    <div>
      <div className='signup-input-box'>
        <input
          type='text'
          name='username'
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
        ></input>
        <label>User Name</label>
      </div>
    </div>
  )
}

export default UsernameForm;
