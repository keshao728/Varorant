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
        <input
          type='password'
          name='password'
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        ></input>
        <label>Password</label>
      </div>
      <div>
        <input
          type='password'
          name='repeat_password'
          value={formData.repeatPassword}
          onChange={(e) =>
            setFormData({ ...formData, repeatPassword: e.target.value })
          }
          required={true}
        ></input>
        <label>Repeat Password</label>
      </div>
    </div>
  )
}
export default PasswordForm;
