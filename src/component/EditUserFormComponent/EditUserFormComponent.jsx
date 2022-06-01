import { Avatar, Input } from "antd";
import { useFormik } from "formik";
import React, { memo, useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUserAction } from "../../redux/actions/getAllUserAction";
import * as Yup from "yup";
import {
  SET_RESET_FORM_FUNCTION,
  SET_SUBMIT_DRAWER_FUNCTION,
} from "../../util/constant/configSystem";
import { editUserAction } from "../../redux/actions/editUserAction";

function EditUserFormComponent(props) {
  const dispatch = useDispatch();

  const { userDetail } = useSelector((state) => state.userReducer);

  console.log("userDetail");

  const { userId, name, email, phoneNumber } = userDetail;

  useEffect(() => {
    dispatch({ type: SET_SUBMIT_DRAWER_FUNCTION, function: handleSubmit });
    dispatch({ type: SET_RESET_FORM_FUNCTION, function: resetForm });
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: userId,
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
    <form className="w-full" onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 h-full">
        <div className="w-full mt-2">
          <div className="mb-5">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              ID
            </label>
            <Input disabled value={userId} name="id" />
          </div>
          <div className="mb-5">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              NAME
            </label>
            <Input onChange={handleChange} value={values.name} name="name" />
            {errors.name ? (
              <p className="text-red-500 text-xs italic">{errors.name}</p>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="flex justify-center items-center w-full ">
          <Avatar size={180} src={userDetail.avatar} />
        </div>
      </div>
      <div className="mb-5">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
          Email
        </label>
        <Input onChange={handleChange} value={values.email} name="email" />
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
          <p className="text-red-500 text-xs italic">{errors.phoneNumber}</p>
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
    </form>
  );
}

export default memo(EditUserFormComponent);
