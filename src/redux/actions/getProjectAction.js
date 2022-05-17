import { projectService } from "../../services/baseService";
import { GET_PROJECT } from "../types/projectType";

export const getProjectAction = (keyword) => {
  return async (dispatch) => {
    try {
      //gọi api
      let result = await projectService.getProject(keyword);
      console.log(result)
      dispatch({
        type: GET_PROJECT,
        value: result.data.content,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
