import { message } from "antd";
import React, { useRef } from "react";
import { NavLink } from "react-router-dom";
import { userServices, validationService } from "../../services/baseService";

export default function Register(props) {
  console.log(props);
  const registerRef = useRef({
    email: "",
    passWord: "",
    name: "",
    phoneNumber: "",
  });
  const nameError = useRef();
  const phoneNumberError = useRef();
  const emailError = useRef();
  const passwordError = useRef();

  const handleChange = (e) => {
    let { value, id, name } = e.target;
    registerRef.current[id] = value;
    console.log(registerRef.current);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    // console.log(nameRef.current);
    let { email, passWord, name, phoneNumber } = e.target;

    let valid = true;

    const {
      checkBlank,
      checkStringLength,
      checkName,
      checkNumber,
      checkEmail,
    } = validationService;

    //valid name
    valid &=
      checkBlank(name, nameError.current) &&
      checkStringLength(name, nameError.current, 5, 30) &&
      checkName(name, nameError.current);

    //valid phoneNumber
    valid &=
      checkBlank(phoneNumber, phoneNumberError.current) &&
      checkNumber(phoneNumber, phoneNumberError.current) &&
      checkStringLength(phoneNumber, phoneNumberError.current, 9, 13);

    //valid email
    valid &=
      checkBlank(email, emailError.current) &&
      checkEmail(email, emailError.current);
    //valid password
    valid &=
      checkBlank(passWord, passwordError.current) &&
      checkStringLength(passWord, passwordError.current, 8, 16);

    if (!valid) {
      console.log(false);
      return;
    }

    console.log(true);
    try {
      let result = await userServices.register(registerRef.current);
      console.log(result);
      alert(result.data.message);
      //   if (result.data.statusCode === 200) {
      // }
    } catch (error) {
      console.log("error", error);
      alert(error.response.data.message);
    }
  };

  return (
    <form
      className="flex flex-col justify-center items-center w-screen/2 h-screen"
      onSubmit={handleRegister}
    >
      <h3 className="text-4xl m-0">Register</h3>
      <input
        type="text"
        className={props.inputStyle}
        placeholder="Name"
        id="name"
        name="Name"
        onChange={handleChange}
      />
      <p id="nameError" className="m-0 text-red-600" ref={nameError}></p>
      <input
        type="text"
        className={props.inputStyle}
        placeholder="Phone Number"
        name="Phone Number"
        id="phoneNumber"
        onChange={handleChange}
      />
      <p
        id="phoneNumberError"
        className="m-0 text-red-600"
        ref={phoneNumberError}
      ></p>

      <input
        type="text"
        className={props.inputStyle}
        placeholder="Email"
        name="Email"
        id="email"
        onChange={handleChange}
      />
      <p id="emailError" className="m-0 text-red-600" ref={emailError}></p>

      <input
        type="password"
        className={props.inputStyle}
        placeholder="Password"
        name="Password"
        id="passWord"
        onChange={handleChange}
        data-type="name"
      />
      <p
        id="passwordError"
        className="m-0 text-red-600"
        ref={passwordError}
      ></p>

      {/* <input
        type="password"
        className={props.inputStyle}
        placeholder="Re-Password"
        id="re-password"
        onChange={handleChange}
      /> */}
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
