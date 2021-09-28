import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

import AuthService from "./AuthService";        // .(10420.04.9)

function RegisterForm() {
  let history = useHistory();
  const { register, handleSubmit, watch, errors } = useForm();
  const password = useRef({});
  password.current = watch("password", "");

  const onSubmit = (data) => {
    AuthService.register(data.username, data.email, data.password).then(
      () => {
        localStorage.message = "You have successfully registered";
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
    <div className="hold-transition login-page">
      <div className="login-box">
        <div className="login-logo">
          <b>Register </b>Form
        </div>
        <div className="card">
          <div className="card-body login-card-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="input-group mb-3">
                <input
                  type="text"
                  name="username"
                  className="form-control-border"
                  placeholder="Username"
                  ref={register({
                    required: true,
                    minLength: 6,
                  })}
                />
                {errors.username && errors.username.type === "required" && (
                  <p>Username is required.</p>
                )}
                {errors.username && errors.username.type === "minLength" && (
                  <p>Username should be at-least 6 characters.</p>
                )}
              </div>
              <div className="input-group mb-3">
                <input
                  type="text"
                  name="email"
                  className="form-control-border"
                  placeholder="Email"
                  ref={register({
                    required: true,
                    pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                  })}
                />
                {errors.email && errors.email.type === "required" && (
                  <p>Email is required.</p>
                )}
                {errors.email && errors.email.type === "pattern" && (
                  <p>Email is not valid.</p>
                )}
              </div>
              <div className="input-group mb-3">
                <input
                  type="password"
                  name="password"
                  className="form-control-border"
                  placeholder="Password"
                  ref={register({
                    required: true,
                    minLength: 4,
                  })}
                />
                {errors.password && errors.password.type === "required" && (
                  <p>Password is required.</p>
                )}
                {errors.password && errors.password.type === "minLength" && (
                  <p>Password should be at-least 4 characters.</p>
                )}
              </div>
              <div className="input-group mb-3">
                <input
                  type="password"
                  name="confirmPassword"
                  className="form-control-border"
                  placeholder="Confirm Password"
                  ref={register({
                    validate: (value) =>
                      value === password.current ||
                      "The passwords do not match",
                  })}
                />
                {errors.confirmPassword && (
                  <p>{errors.confirmPassword.message}</p>
                )}
              </div>
              <div className="card-footer">
                <label></label>
                <button type="submit">Register</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
