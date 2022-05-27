import { taskServices } from "../../services/baseService";
import { GET_ALL_COMMENT } from "../../util/constant/configSystem";

export const getAllCommentAction = (id) => {
  return async (dispatch) => {
    try {
      let { data } = await taskServices.getAllComment(id);
      console.log(data.content);
      dispatch({
        type: GET_ALL_COMMENT,
        data: data.content,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
