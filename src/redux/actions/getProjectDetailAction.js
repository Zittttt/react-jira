import EditProjectFormWithFormik from "../../component/EditProjectFormComponent/EditProjectFormComponent";
import { projectService } from "../../services/baseService";
import {
  DISPLAY_LOADING,
  GET_PROJECT_DETAIL,
  HIDE_LOADING,
} from "../../util/constant/configSystem";

export const getProjectDetailAction = (id) => {
  return async (dispatch) => {
    dispatch({ type: DISPLAY_LOADING });
    try {
      let { data } = await projectService.getProjectDetail(id);
      console.log(data.content);
      const action = {
        type: GET_PROJECT_DETAIL,
        data: data.content,
      };
      dispatch(action);
      setTimeout(() => {
        dispatch({ type: HIDE_LOADING });
      }, 100);
    } catch (error) {
      console.log(error);
    }
  };
};
