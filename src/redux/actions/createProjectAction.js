import { projectService } from "../../services/baseService";
import {
  DISPLAY_LOADING,
  HIDE_LOADING,
} from "../../util/constant/configSystem";

export const createProjectAction = (data) => {
  return async (dispatch) => {
    dispatch({ type: DISPLAY_LOADING });
    try {
      const result = await projectService.createProjectAuthorize(data);
      console.log(result);

      setTimeout(() => {
        dispatch({ type: HIDE_LOADING });
      }, 500);
    } catch (error) {
      console.log(error);
    }
  };
};
