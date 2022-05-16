import { userServices } from "../../services/baseService";
import { LOGIN } from "../types/userLoginType";

export const loginAction = (userLogin, props) => {
  return async (dispatch) => {
    try {
      let result = await userServices.login(userLogin);
      console.log(result);
      if (result.data.statusCode === 200) {
        dispatch({
          type: LOGIN,
          value: result.data.content,
        });
        props.history.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
};
