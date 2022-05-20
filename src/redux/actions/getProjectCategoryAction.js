import { projectService } from "../../services/baseService";
import { GET_CATEGORY } from "../types/projectType";

export const getProjectCategoryAction = () => {
  return async (dispatch) => {
    try {
      let { data } = await projectService.getProjectCategory();
      console.log(data.content);
      const action = {
        type: GET_CATEGORY,
        value: data.content,
      };
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
};
