import React from "react";
import { NavLink } from "react-router-dom";
import { loginAction } from "../../redux/actions/loginAction";
import { withFormik } from "formik";
import { connect } from "react-redux";
import * as Yup from "yup";

function Login(props) {
  const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
    props;

  return (
    <form
      className="flex flex-col justify-center items-center w-screen/2 h-screen"
      onSubmit={handleSubmit}
    >
      <h3 className="text-4xl mb-10">Login</h3>
      <input
        type="text"
        className={props.inputStyle}
        placeholder="Email"
        onChange={handleChange}
        id="email"
        name="email"
      />
      {errors.email ? <p className="text-red-500">{errors.email}</p> : ""}
      <input
        type="password"
        className={props.inputStyle}
        placeholder="Password"
        onChange={handleChange}
        id="password"
        name="password"
      />
      {errors.password ? (
        <p className="text-red-500 p-0 m-0">{errors.password}</p>
      ) : (
        ""
      )}

      <button
        className="loginButton bg-[#345da7] w-2/5 mt-5 p-2.5 text-white rounded-md border-2 border-transparent hover:border-cyan-400"
        type="submit"
      >
        Login
      </button>
      <p>
        Don't have an account yet?{" "}
        <NavLink to={"/register"}>Register now</NavLink>
      </p>
      <div className="social mt-2">
        <button
          className="rounded-full bg-[#3b5998] text-white h-10 w-10 mr-4"
          type="button"
        >
          <i className="fab fa-facebook-f"></i>
        </button>
        <button
          className="rounded-full bg-[#1890ff] text-white h-10 w-10"
          type="button"
        >
          <i className="fab fa-twitter"></i>
        </button>
      </div>
    </form>
  );
}

const LoginWithFormik = withFormik({
  mapPropsToValues: () => ({ email: "", password: "" }),

  handleSubmit: (values, { props, setSubmitting }) => {
    const action = loginAction(values, props);
    props.dispatch(action);
  },

  validationSchema: Yup.object().shape({
    email: Yup.string()
      .required("Email is required!")
      .email("Email is invalid!"),
    password: Yup.string()
      .required("Password is required!")
      .min(6, "Password must have min 6 characters!")
      .max(16, "Password must have max 18 characters!"),
  }),
})(Login);

export default connect()(LoginWithFormik);
