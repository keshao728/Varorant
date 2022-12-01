import React from "react";
import "./SignUpForm.css"

const UsernameForm = ({ username, setUsername, errors }) => {

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
          value={username}
          required
          onChange={(e) =>
            {setUsername(e.target.value)}
          }
        ></input>
        <label>USERNAME</label>
        {!!Object.values(errors).length && (
          <div className='sign-in-error'>
            <img className="caution" src="https://imgur.com/E1p7Fvo.png" />
            {/* {errors?.filter(error => error.includes("username"))} */}
            {errors.username && <div>{errors.username}</div>}
          </div>
        )}
      </div>
    </div>
  )
}

export default UsernameForm;
