import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../../redux/actions/loginAction";
import { LOGIN } from "../../redux/types/userLoginType";

export default function Login(props) {
  let loginStatus = JSON.parse(localStorage.getItem(LOGIN));

  const checkLogin = () => {
    // if (loginStatus) {
    //   props.history.push("/register");
    // }
    return loginStatus ? props.history.push("/projectmanagement") : null;
  };

  useEffect(() => {
    checkLogin();
  }, [loginStatus]);

  const dispatch = useDispatch();

  const loginRef = useRef({ email: "", password: "" });

  const handleChange = (event) => {
    const { value, id } = event.target;
    loginRef.current[id] = value;
    console.log(loginRef.current);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    const action = loginAction(loginRef.current, props);
    dispatch(action);
  };

  return (
    <form
      className="flex flex-col justify-center items-center w-screen/2 h-screen"
      onSubmit={(event) => {
        handleLogin(event);
      }}
    >
      <h3 className="text-4xl m-0">Login</h3>
      <input
        type="text"
        className={props.inputStyle}
        placeholder="Email"
        onChange={handleChange}
        id="email"
      />
      <input
        type="password"
        className={props.inputStyle}
        placeholder="Password"
        onChange={handleChange}
        id="password"
      />
      <button
        className="loginButton bg-[#0052cc] w-2/5 mt-5 p-2.5 text-white rounded-md border-2 border-transparent hover:border-cyan-400"
        type="submit"
      >
        Login
      </button>
      <p>
        Don't have an account yet?{" "}
        <NavLink to={"/register"}>Register now</NavLink>
      </p>
      <div className="social mt-2">
        <button className="rounded-full bg-[#3b5998] text-white h-10 w-10 mr-4">
          <i className="fab fa-facebook-f"></i>
        </button>
        <button className="rounded-full bg-[#1890ff] text-white h-10 w-10">
          <i className="fab fa-twitter"></i>
        </button>
      </div>
    </form>
  );
}
