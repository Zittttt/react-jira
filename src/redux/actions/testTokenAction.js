import { useHistory } from "react-router-dom";
import { userServices } from "../../services/baseService";
import {
  DISPLAY_LOADING,
  HIDE_LOADING,
  STATUS_CODE,
} from "../../util/constant/configSystem";
import { getProjectAction } from "./getProjectAction";

export const testTokenAction = (props) => {
  return async (dispatch) => {
    try {
      let result = await userServices.checkLogin();
      console.log(result);
    } catch (error) {
      console.log(error);
      if (error.response.data.statusCode === STATUS_CODE.SERVER_ERROR) {
        props.push("/");
        const action = getProjectAction();
        dispatch(action);
      } else {
        props.push("/login");
      }
    }
  };
};
