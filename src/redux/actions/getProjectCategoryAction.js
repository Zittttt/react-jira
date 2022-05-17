import { projectService } from "../../services/baseService";
import { GET_CATEGORY } from "../types/projectType";

export const getProjectCategoryAction = () => {
  return async (dispatch) => {
    try {
      let result = await projectService.getProjectCategory();
      console.log(result);
      const action = {
        type: GET_CATEGORY,
        value: result.data.content,
      };
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
};
