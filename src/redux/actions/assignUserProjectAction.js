import { useHistory } from "react-router-dom";
import { projectService } from "../../services/baseService";
import {
  NOTIFICATION_ICON,
  SHOW_NOTIFICATION,
} from "../../util/constant/configSystem";
import { GET_PROJECT } from "../types/projectType";
import { getProjectAction } from "./getProjectAction";

export const assignUserProjectAction = (value) => {
  return async (dispatch) => {
    console.log(value.valueDispatch);
    try {
      let { data } = await projectService.assignUserProject(value);
      console.log(data);
      let message = data.content;
      dispatch({
        type: SHOW_NOTIFICATION,
        value: { description: message, type: NOTIFICATION_ICON.SUCCESS },
      });
      dispatch(getProjectAction());
    } catch (error) {
      console.log(error);
      let description = error.response.data.content;
      dispatch({
        type: SHOW_NOTIFICATION,
        value: { description, type: NOTIFICATION_ICON.ERROR },
      });
    }
  };
};
