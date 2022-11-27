import React from "react";

const UsernameForm = ({ formData, setFormData }) => {
  return (
    <div>
      <div>
        <label>User Name</label>
        <input
          type='text'
          name='username'
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
        ></input>
      </div>
    </div>
  )
}

export default UsernameForm;
