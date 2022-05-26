import { taskServices } from "../../services/baseService";
import { getProjectDetailAction } from "./getProjectDetailAction";

export const updateTaskAction = (data) => {
  return async (dispatch) => {
    try {
      let result = await taskServices.updateTask(data);
      console.log(result);
      dispatch(getProjectDetailAction(data.projectId));
    } catch (error) {
      console.log(error);
    }
  };
};
