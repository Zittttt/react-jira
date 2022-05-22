import { userServices } from "../../services/baseService";
import { GET_ALL_USER } from "../../util/constant/configSystem";
export const getAllUserAction = (keyword) => {
  return async (dispatch) => {
    try {
      let { data } = await userServices.getAllUser(keyword);
      console.log(data.content);
      dispatch({
        type: GET_ALL_USER,
        value: data.content,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
