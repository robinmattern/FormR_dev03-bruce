import React from "react";
import { useForm } from "react-hook-form";

import { useHistory } from "react-router-dom";
import AuthService from "./AuthService";        // .(10420.04.6)

function LoginForm() {
  let history = useHistory();
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    AuthService.login(data.username, data.password).then(
      () => {
        localStorage.message = "Welcome, " + data.username.charAt(0).toUpperCase() + data.username.slice(1)
        history.push("/home");
        window.location.reload();
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
    <div className="hold-transition login-page">
      <div className="login-box">
        <div className="login-logo">
          <b>Login </b>Form
        </div>
        <div className="card">
          <div className="card-body login-card-body">
            <p className="login-box-msg">Login to start your session</p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="input-group mb-3">
                <div>
                  <input
                    type="text"
                    className="form-control-border"
                    placeholder="Username"
                    name="username"
                    ref={register({ required: true })}
                  />
                  {errors.username && errors.username.type === "required" && (
                    <p>Username is required.</p>
                  )}
                </div>
              </div>

              <div className="input-group mb-3">
                <div>
                  <input
                    type="password"
                    className="form-control-border"
                    placeholder="Password"
                    name="password"
                    ref={register({
                      required: true,
                    })}
                  />
                  {errors.password && errors.password.type === "required" && (
                    <p>Password is required.</p>
                  )}
                </div>
              </div>

              <div className="card-footer">
                <label></label>
                <button type="submit">Login</button>
              </div>

              <div>
                <p className="mb-1">
                  <a href="./forgotpassword">I forgot my password</a>
                </p>
                <hr></hr>
                <p className="mb-1">
                  <a href="./register"><b>Register</b> for a new account</a>
                </p>
          </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
