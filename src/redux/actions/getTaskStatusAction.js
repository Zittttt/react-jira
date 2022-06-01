import { taskServices } from "../../services/baseService";
import { GET_TASK_STATUS } from "../../util/constant/configSystem";

export const getTaskStatusAction = () => {
  return async (dispatch) => {
    try {
      let { data } = await taskServices.getTaskStatus();
      dispatch({ type: GET_TASK_STATUS, value: data.content });
    } catch (error) {
      console.log(error);
    }
  };
};
