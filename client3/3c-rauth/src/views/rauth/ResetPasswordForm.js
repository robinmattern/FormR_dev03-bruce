import React from "react";
import { useForm } from "react-hook-form";

import { useHistory } from "react-router-dom";
import AuthService from "./AuthService";       // .(10420.04.10)

function ResetPasswordForm() {
  let history = useHistory();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    AuthService.resetPassword(data.email, data.newPassword).then(
      () => {
        localStorage.message = "You have successfully changed your password" 
        history.push("/home");
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
          localStorage.message = resMessage;
          history.push("/home");
      }
    );
  };

  return (
    <body className="hold-transition login-page">
      <div className="login-box">
        <div className="login-logo">
          <b>Reset Password </b>Form
        </div>
        <div className="card">
          <div className="card-body login-card-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="input-group mb-3">
                <input
                  type="password"
                  className="form-control-border"
                  placeholder="New Password"
                  name="newPassword"
                  ref={register({})}
                />
              </div>
              <div className="input-group mb-3">
                <input
                  type="password"
                  name="confirmNewPassword"
                  className="form-control-border"
                  placeholder="Confirm New Password"
                  ref={register({})}
                />
              </div>
              <div className="card-footer">
                <label></label>
                <button type="submit">Reset Password</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </body>
  );
}

export default ResetPasswordForm;
