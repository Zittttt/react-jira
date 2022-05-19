import { Redirect, useHistory } from "react-router-dom";
import { userServices } from "../../services/baseService";
import { TOKEN } from "../../util/config";
import {
  DISPLAY_LOADING,
  HIDE_LOADING,
  NOTIFICATION_ICON,
  SHOW_NOTIFICATION,
  STATUS_CODE,
  USER_LOGIN,
} from "../../util/constant/configSystem";
import { LOGIN } from "../types/userType";

export const loginAction = (userLogin, props) => {
  return async (dispatch) => {
    try {
      dispatch({ type: DISPLAY_LOADING });
      let { data, status } = await userServices.login(userLogin);
      console.log(data);
      console.log(status);
      //login thành công, đưa dữ liệu lên localStorage và redux
      localStorage.setItem(USER_LOGIN, JSON.stringify(data.content));
      localStorage.setItem(TOKEN, data.content.accessToken);
      dispatch({
        type: LOGIN,
        value: data.content,
      });
      setTimeout(() => {
        dispatch({ type: HIDE_LOADING });
        dispatch({
          type: SHOW_NOTIFICATION,
          value: {
            message: "",
            description: "Loggin successfully !",
            type: NOTIFICATION_ICON.SUCCESS,
          },
        });
      }, 500);
      // alert("Đăng nhập thành công!");

      // chuyển hướng đến home
      props.history.push("/");
      console.log(props);
    } catch (error) {
      const { message } = error.response.data;
      setTimeout(() => {
        dispatch({ type: HIDE_LOADING });
        dispatch({
          type: SHOW_NOTIFICATION,
          value: {
            message: "Login faild!",
            description: message,
            type: NOTIFICATION_ICON.ERROR,
          },
        });
      }, 500);
    }
  };
};
