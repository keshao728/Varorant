import React from "react";

// const onSignUp = async (e) => {
//   e.preventDefault();
//   if (password === repeatPassword) {
//     const data = await dispatch(signUp(username, email, password));
//     if (data) {
//       setErrors(data)
//     }
//   }
// };

const PasswordForm = ({ formData, setFormData }) => {
  return (
    <div>
      <div>
        <label>Password</label>
        <input
          type='password'
          name='password'
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        ></input>
      </div>
      <div>
        <label>Repeat Password</label>
        <input
          type='password'
          name='repeat_password'
          value={formData.repeatPassword}
          onChange={(e) =>
            setFormData({ ...formData, repeatPassword: e.target.value })
          }
          required={true}
        ></input>
      </div>
    </div>
  )
}
export default PasswordForm;
