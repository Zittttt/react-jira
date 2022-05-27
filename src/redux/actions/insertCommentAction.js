import { taskServices } from "../../services/baseService";

export const inserCommentAction = (data) => {
  return async (dispatch) => {
    try {
      let result = await taskServices.insertComment(data);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };
};
