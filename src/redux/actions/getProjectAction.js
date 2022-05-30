import { projectService } from "../../services/baseService";
import { STATUS_CODE } from "../../util/config";
import {
  DISPLAY_LOADING,
  HIDE_LOADING,
} from "../../util/constant/configSystem";
import { GET_PROJECT } from "../types/projectType";

export const getProjectAction = (keyword) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: DISPLAY_LOADING,
      });
      //gọi api
      let { data, status } = await projectService.getProject(keyword);
      console.log(data);
      dispatch({
        type: GET_PROJECT,
        value: data.content,
      });
      setTimeout(() => {
        dispatch({
          type: HIDE_LOADING,
        });
      }, 100);
    } catch (error) {
      console.log(error);
    }
    dispatch({
      type: HIDE_LOADING,
    });
  };
};
