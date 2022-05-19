import EditProjectFormComponent from "../../component/EditProjectFormComponent/EditProjectFormComponent";
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

      const action1 = {
        type: GET_PROJECT_EDIT,
        data: data.content,
      };
      const action2 = {
        type: OPEN_PROJECT_EDIT_FORM,
        Component: <EditProjectFormComponent />,
      };
      dispatch(action1);
      dispatch(action2);
    } catch (error) {
      console.log(error);
    }
  };
};
