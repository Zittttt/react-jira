import { projectService } from "../../services/baseService";
import {
  CLOSE_DRAWER,
  DISPLAY_LOADING,
  HIDE_LOADING,
} from "../../util/constant/configSystem";
import { getProjectAction } from "./getProjectAction";

export const updateProjectAction = (data) => {
  return async (dispatch) => {
    dispatch({ type: DISPLAY_LOADING });
    try {
      let result = await projectService.updateProject(data);
      console.log(result);

      dispatch(getProjectAction());
      dispatch({ type: CLOSE_DRAWER });

      setTimeout(() => {
        dispatch({ type: HIDE_LOADING });
      }, 500);
    } catch (error) {
      console.log(error);
      setTimeout(() => {
        dispatch({ type: HIDE_LOADING });
      }, 500);
    }
  };
};
