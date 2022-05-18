import { projectService } from "../../services/baseService";
import { GET_PROJECT } from "../types/projectType";

export const getProjectAction = (keyword) => {
  return async (dispatch) => {
    try {
      //gọi api
      let { data } = await projectService.getProject(keyword);
      console.log(data);
      dispatch({
        type: GET_PROJECT,
        value: data.content,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
