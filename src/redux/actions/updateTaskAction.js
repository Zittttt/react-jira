import { taskServices } from "../../services/baseService";
import {
  CLOSE_MODAL,
  DISPLAY_LOADING,
  HIDE_LOADING,
  NOTIFICATION_ICON,
  SHOW_NOTIFICATION,
} from "../../util/constant/configSystem";
import { getProjectDetailAction } from "./getProjectDetailAction";

export const updateTaskAction = (data) => {
  return async (dispatch) => {
    dispatch({ type: DISPLAY_LOADING });
    try {
      let result = await taskServices.updateTask(data);
      console.log(result);
      dispatch(getProjectDetailAction(data.projectId));
      dispatch({ type: CLOSE_MODAL });
      setTimeout(() => {
        dispatch({ type: HIDE_LOADING });
        dispatch({
          type: SHOW_NOTIFICATION,
          value: {
            type: NOTIFICATION_ICON.SUCCESS,
            description: result.data.message,
          },
        });
      }, 100);
    } catch (error) {
      console.log(error);
      setTimeout(() => {
        dispatch({ type: HIDE_LOADING });
        dispatch({
          type: SHOW_NOTIFICATION,
          value: {
            type: NOTIFICATION_ICON.ERROR,
            description: error.response.data.content,
          },
        });
      }, 500);
    }
  };
};
