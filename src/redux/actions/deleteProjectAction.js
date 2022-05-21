import { projectService } from "../../services/baseService";
import {
  DISPLAY_LOADING,
  HIDE_LOADING,
} from "../../util/constant/configSystem";
import { getProjectAction } from "./getProjectAction";

export const deleteProjectAction = (id) => {
  return async (dispatch) => {
    dispatch({ type: DISPLAY_LOADING });
    try {
      //gọi api deleteProject
      let result = await projectService.deleteProject(id);
      console.log(result);

      //load lại project
      dispatch(getProjectAction());

      //ẩn loading sreen
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
