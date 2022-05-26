import { taskServices } from "../../services/baseService";
import { GET_TASK_DETAIL } from "../../util/constant/configSystem";

export const getTaskDetailAction = (id) => {
  return async (dispatch) => {
    try {
      let { data } = await taskServices.getTaskDetail(id);
      console.log(data.content);
      dispatch({
        type: GET_TASK_DETAIL,
        value: data.content,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
