import { useFormik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUserAction } from "../../redux/actions/getAllUserAction";
import * as Yup from "yup";
import { editUserAction } from "../../redux/actions/editUserAction";
import { Avatar, Button, Input } from "antd";

export default function Profile() {
  const dispatch = useDispatch();

  const { userLogin } = useSelector((state) => state.userReducer);

  console.log(userLogin);

  const { id, avatar, email, name, phoneNumber } = userLogin;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: id,
      name: name,
      email: email,
      phoneNumber: phoneNumber,
      passWord: "",
      passwordConfirm: "",
    },

    validationSchema: Yup.object().shape({
      name: Yup.string()
        .required("Name is required!")
        .matches(/^[A-Za-z0-9 ]*$/, "Please enter valid name"),
      email: Yup.string()
        .required("Email is required!")
        .email("Email is invalid!"),
      phoneNumber: Yup.string()
        .matches(
          /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
          "Phone number is not valid!"
        )
        .length(10, "Phone Number must be exactly 10 characters")
        .required("Phone Number is required!"),
      passWord: Yup.string()
        .required("Password is required!")
        .min(6, "Password must have min 6 characters!")
        .max(16, "Password must have max 18 characters!"),
      passwordConfirm: Yup.string()
        .required("Re-password is required!")
        .oneOf([Yup.ref("passWord"), null], "Password must match!"),
    }),

    onSubmit: (values) => {
      dispatch(editUserAction(values));
    },
  });

  const { values, handleChange, handleSubmit, errors, resetForm } = formik;

  return (
    <div className="w-full">
      <h3 className="text-2xl text-[#1f2937]">Profile</h3>
      <form className="w-full" onSubmit={handleSubmit}>
        <div className="grid grid-cols-3 mb-5">
          <div className="w-full col-span-2">
            <div className="">
              <div className="mb-5">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  NAME
                </label>
                <Input
                  onChange={handleChange}
                  value={values.name}
                  name="name"
                />
                {errors.name ? (
                  <p className="text-red-500 text-xs italic">{errors.name}</p>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="mb-5">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Email
              </label>
              <Input
                onChange={handleChange}
                value={values.email}
                name="email"
              />
              {errors.email ? (
                <p className="text-red-500 text-xs italic">{errors.email}</p>
              ) : (
                ""
              )}
            </div>
            <div className="mb-5">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Phone
              </label>
              <Input
                onChange={handleChange}
                value={values.phoneNumber}
                name="phoneNumber"
              />
              {errors.phoneNumber ? (
                <p className="text-red-500 text-xs italic">
                  {errors.phoneNumber}
                </p>
              ) : (
                ""
              )}
            </div>
            <div className="mb-5">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Password
              </label>
              <Input
                type="password"
                name="passWord"
                onChange={handleChange}
                value={values.passWord}
              />
              {errors.passWord ? (
                <p className="text-red-500 text-xs italic">{errors.passWord}</p>
              ) : (
                ""
              )}
            </div>
            <div>
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Re-password
              </label>
              <Input
                name="passwordConfirm"
                type="password"
                onChange={handleChange}
                value={values.passwordConfirm}
              />

              {errors.passwordConfirm ? (
                <p className="text-red-500 text-xs italic">
                  {errors.passwordConfirm}
                </p>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="flex justify-center items-center col-span-1 ">
            <img src={avatar} width="60%" className="rounded-md" />
          </div>
        </div>
        <button
          className="rounded-md px-5 py-2 bg-[#002140] hover:bg-[#1890ff] text-white transition-all duration-200"
          type="submit"
        >
          Save
        </button>
      </form>
    </div>
  );
}