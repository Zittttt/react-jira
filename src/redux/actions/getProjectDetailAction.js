import EditProjectFormWithFormik from "../../component/EditProjectFormComponent/EditProjectFormComponent";
import { projectService } from "../../services/baseService";
import {
  GET_PROJECT_EDIT,
  OPEN_PROJECT_EDIT_FORM,
} from "../../util/constant/configSystem";

export const getProjectDetailAction = (id) => {
  return async (dispatch) => {
    try {
      let { data } = await projectService.getProjectDetail(id);
      console.log(data.content);
      const action = {
        type: GET_PROJECT_EDIT,
        data: data.content,
      };
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
};
