   import   React, { useRef } from "react";
// import   ReactDOM          from "react-dom";
   import { useForm }         from "react-hook-form";

   import { useHistory }      from "react-router-dom";
   import   AuthService       from "./AuthService.js";      // .(10420.04.4 RAM Was: ../services)

function ChangeUserProfileForm() {
  let history = useHistory();

  const currentUser = AuthService.getCurrentUser();

  if (!currentUser) {
    localStorage.message = "You are not logged in";
    history.push("/home");
    window.location.reload();
  }

  const { register, handleSubmit, watch, errors } = useForm({
    defaultValues: {
      id: currentUser.id,
      username: currentUser.username,
      email: currentUser.email,
      password: "",
      confirmPassword: "",
    },
  });

  const password = useRef({});
  password.current = watch("password", "");

  const onSubmit = (data) => {
 
    console.log(data);

    AuthService.updateCurrentUser(data.id, data.username, data.email, data.password).then(
      () => {
        alert(data.username + " was successfully updated");
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
          <b>Change User Profile </b>Form
        </div>
        <div className="card">
          <div className="card-body login-card-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="input-group mb-3">
                <input
                  type="hidden"
                  name="id"
                  className="form-control-border"
                  ref={register()}
                />
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
                  type="text"
                  name="password"
                  className="form-control-border"
                  placeholder="Password"
                  ref={register({
                    minLength: 4,
                  })}
                />
                {errors.password && errors.password.type === "minLength" && (
                  <p>Password should be at-least 4 characters.</p>
                )}
              </div>
              <div className="input-group mb-3">
                <input
                  type="text"
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
                <button type="submit">Save</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangeUserProfileForm;
