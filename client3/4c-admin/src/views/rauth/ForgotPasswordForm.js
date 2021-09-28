   import   React, { useRef } from "react";
// import   ReactDOM          from "react-dom";
   import { useForm }         from "react-hook-form";

   import { useHistory }      from "react-router-dom";
   import   AuthService       from "./AuthService.js";      // .(10420.04.5)

   function ForgotPasswordForm() {

        let history = useHistory();

    const { register, handleSubmit, watch, errors } = useForm();
    const   password = useRef({});
            password.current = watch("password", "");

  const onSubmit = (data) => {
    AuthService.updateCurrentUser( data.username, data.email, data.password).then(  // .(10331.12.1 RAM Was AuthService.register)
      () => {
        alert( `Email sent to ${data.username}.` );                                 // .(10331.12.2)
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
          <b>Forgot Password </b>Form
        </div>
        <div className="card">
          <div className="card-body login-card-body">
            <form onSubmit={handleSubmit(onSubmit)}>
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
                <div className="card-footer">
                  <label></label>
                  <button type="submit">Send Forgot Password Email</button>
                </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordForm;
