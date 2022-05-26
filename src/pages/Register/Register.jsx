import React, { useRef } from "react";
import { NavLink } from "react-router-dom";
import { userServices, validationService } from "../../services/baseService";
import * as Yup from "yup";
import { withFormik } from "formik";
import { connect } from "react-redux";
import {
  NOTIFICATION_ICON,
  SHOW_NOTIFICATION,
} from "../../util/constant/configSystem";
import { registerAction } from "../../redux/actions/registerAction";

function Register(props) {
  const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
    props;

  const { email, passWord, name, phoneNumber, confirmPassword } = values;

  return (
    <form
      className="flex flex-col justify-center items-center w-screen/2 h-screen"
      onSubmit={handleSubmit}
    >
      <h3 className="text-4xl m-0">Register</h3>
      <input
        type="text"
        className={props.inputStyle}
        placeholder="Name"
        name="name"
        onChange={handleChange}
        value={name}
      />
      <p className="m-0 text-red-600">{errors.name}</p>
      <input
        className={props.inputStyle}
        placeholder="Phone Number"
        name="phoneNumber"
        onChange={handleChange}
        value={phoneNumber}
      />
      <p className="m-0 text-red-600">{errors.phoneNumber}</p>

      <input
        type="text"
        className={props.inputStyle}
        placeholder="Email"
        name="email"
        onChange={handleChange}
        value={email}
      />
      <p className="m-0 text-red-600">{errors.email}</p>

      <input
        type="password"
        className={props.inputStyle}
        placeholder="Password"
        name="passWord"
        onChange={handleChange}
        value={passWord}
      />
      <p className="m-0 text-red-600">{errors.passWord}</p>

      <input
        type="password"
        className={props.inputStyle}
        placeholder="Confirm Password"
        name="confirmPassword"
        onChange={handleChange}
        value={confirmPassword}
      />
      <p className="m-0 text-red-600">{errors.confirmPassword}</p>

      <button
        className="loginButton bg-[#345da7] w-2/5 mt-5 p-2.5 text-white rounded-md border-2 border-transparent hover:border-[#4bb4de]"
        type="submit"
      >
        Register
      </button>
      <p>
        Already have an account?
        <NavLink to={"/login"}>Login here</NavLink>
      </p>
    </form>
  );
}

const RegisterWithFormik = withFormik({
  mapPropsToValues: () => ({
    email: "",
    passWord: "",
    name: "",
    phoneNumber: "",
    confirmPassword: "",
  }),

  handleSubmit: async (values, { props, setSubmitting, resetForm }) => {
    await props.dispatch(registerAction(values));
    resetForm();
  },

  validationSchema: Yup.object().shape({
    email: Yup.string()
      .required("Email is required!")
      .email("Email is invalid!"),
    passWord: Yup.string()
      .required("Password is required!")
      .min(6, "Password must have min 6 characters!")
      .max(16, "Password must have max 18 characters!"),
    name: Yup.string()
      .required("Name is required!")
      .matches(/^[A-Za-z0-9 ]*$/, "Please enter valid name"),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("passWord"), null],
      "Passwords must match!"
    ),
    phoneNumber: Yup.string()
      .matches(
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
        "Phone number is not valid!"
      )
      .length(10, "Phone Number must be exactly 10 characters")
      .required("Phone Number is required!"),
  }),
})(Register);

const mapStateToProps = (state) => ({
  regisResult: state.userReducer.regisResult,
});

export default connect(mapStateToProps)(RegisterWithFormik);
