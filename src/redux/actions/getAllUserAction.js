import { userServices } from "../../services/baseService";
import { GET_ALL_USER } from "../../util/constant/configSystem";
export const getAllUserAction = (keyword) => {
  return async (dispatch) => {
    console.log(keyword);
    try {
      let result = await userServices.getAllUser(keyword ? keyword : "");
      console.log(result);
      dispatch({
        type: GET_ALL_USER,
        value: result.data.content,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
