import React from "react";
import "./SignUpForm.css"

const UsernameForm = ({ formData, setFormData, usernameErr, formSubmitted }) => {

  // const err = [];
  // useEffect(async () => {
  //   if (!username || isEmpty2(username)) err.username = 'Please provide a username'
  //   if (username.length > 15) err.username = 'Username must be less than 15 characters'
  //   if (username.length < 3) err.username = 'Username must be at least 3 characters'
  //   return err
  // }, [username])
  // console.log("EEEEEEEE", err)

  return (
    <div>
      <div className='signup-input-box'>
        <input
          type='text'
          name='username'
          value={formData.username}
          required
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
        ></input>
        <label>USERNAME</label>
        {!!usernameErr && formSubmitted && (
          <div className='sign-in-error'>
            <img className="caution" src="https://imgur.com/E1p7Fvo.png" />
            {/* {errors.filter(error => error.includes("username"))} */}
            {usernameErr}
          </div>
        )}
      </div>
    </div>
  )
}

export default UsernameForm;
