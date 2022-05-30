import { userServices } from "../../services/baseService";
import {
  CLOSE_DRAWER,
  DISPLAY_LOADING,
  HIDE_LOADING,
  NOTIFICATION_ICON,
  SHOW_NOTIFICATION,
} from "../../util/constant/configSystem";
import { getAllUserAction } from "./getAllUserAction";

export const editUserAction = (userDetail) => {
  return async (dispatch) => {
    dispatch({ type: DISPLAY_LOADING });
    try {
      let { data } = await userServices.editUser(userDetail);
      console.log(data);

      dispatch(getAllUserAction());
      setTimeout(() => {
        dispatch({ type: HIDE_LOADING });
        dispatch({ type: CLOSE_DRAWER });
        dispatch({
          type: SHOW_NOTIFICATION,
          value: {
            type: NOTIFICATION_ICON.SUCCESS,
            description: data.content,
          },
        });
      }, 300);
    } catch (error) {
      console.log(error);
    }
  };
};
