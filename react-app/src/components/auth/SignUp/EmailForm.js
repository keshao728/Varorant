import React from "react";

const EmailForm = ({ formData, setFormData }) => {
  return (
    <div>
      <div>
        <label>Email</label>
        <input
          type='text'
          name='email'
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
        ></input>
      </div>
    </div>
  )
}

export default EmailForm;
