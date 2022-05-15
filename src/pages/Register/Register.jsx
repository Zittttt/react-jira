import React, { useRef } from "react";
import { NavLink } from "react-router-dom";
import { userServices } from "../../services/baseService";

export default function Register(props) {
  console.log(props)
  const registerRef = useRef({
    email: "",
    passWord: "",
    name: "",
    phoneNumber: "",
  });

  const handleChange = (e) => {
    const { value, id } = e.target;
    // console.log(id, value);
    registerRef.current[id] = value;
    console.log(registerRef.current);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      let result = await userServices.register(registerRef.current);
      console.log(result);
      if (result.data.statusCode === 200) {
      }
    } catch (error) {
      console.log(error);
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
        onChange={handleChange}
      />
      <input
        type="number"
        className={props.inputStyle}
        placeholder="Phone Number"
        id="phoneNumber"
        onChange={handleChange}
      />
      <input
        type="email"
        className={props.inputStyle}
        placeholder="Email"
        id="email"
        onChange={handleChange}
      />
      <input
        type="password"
        className={props.inputStyle}
        placeholder="Password"
        id="passWord"
        onChange={handleChange}
      />
      {/* <input
        type="password"
        className={props.inputStyle}
        placeholder="Re-Password"
        id="re-password"
        onChange={handleChange}
      /> */}
      <button
        className="loginButton bg-[#0052cc] w-2/5 mt-5 p-2.5 text-white rounded-md border-2 border-transparent hover:border-cyan-400"
        type="submit"
      >
        Register
      </button>
      <p>
        Already have an account?
        <NavLink to={"/"}>Login here</NavLink>
      </p>
    </form>
  );
}
