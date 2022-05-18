import { Redirect, useHistory } from "react-router-dom";
import { userServices } from "../../services/baseService";
import { STATUS_CODE, TOKEN, USER_LOGIN } from "../../util/config";
import { LOGIN } from "../types/userType";

export const loginAction = (userLogin, props) => {
  return async (dispatch) => {
    try {
      let { data, status } = await userServices.login(userLogin);
      console.log(data);
      if (status === STATUS_CODE.SUCCESS) {
        //login thành công, đưa dữ liệu lên localStorage và redux
        localStorage.setItem(USER_LOGIN, JSON.stringify(data.content));
        localStorage.setItem(TOKEN, data.content.accessToken);
        dispatch({
          type: LOGIN,
          value: data.content,
        });
        // chuyển hướng đến home
        props.history.push("/");
        console.log(props);
      }
    } catch (error) {
      console.log(error);
    }
  };
};
