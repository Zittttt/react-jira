import { taskServices } from "../../services/baseService";
import {
  CLOSE_MODAL,
  HIDE_LOADING,
  NOTIFICATION_ICON,
  SHOW_NOTIFICATION,
} from "../../util/constant/configSystem";
import { getProjectDetailAction } from "./getProjectDetailAction";

export const removeTaskAction = (id, projectId) => {
  return async (dispatch) => {
    try {
      let result = await taskServices.removeTask(id);
      console.log(result);
      dispatch(getProjectDetailAction(projectId));
      dispatch({ type: CLOSE_MODAL });
      setTimeout(() => {
        dispatch({ type: HIDE_LOADING });
        dispatch({
          type: SHOW_NOTIFICATION,
          value: {
            type: NOTIFICATION_ICON.SUCCESS,
            description: result.data.content,
          },
        });
      }, 500);
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
