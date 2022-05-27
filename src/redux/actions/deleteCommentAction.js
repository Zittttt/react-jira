import { taskServices } from "../../services/baseService";

export const deleteCommentAction = (id) => {
  return async (dispatch) => {
    try {
      let result = await taskServices.deleteComment(id);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };
};
