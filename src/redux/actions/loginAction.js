import { userServices } from "../../services/baseService";
import { TOKEN } from "../../util/config";
import { LOGIN } from "../types/userType";

export const loginAction = (userLogin, props) => {
  return async (dispatch) => {
    try {
      let result = await userServices.login(userLogin);
      console.log(result);
      if (result.data.statusCode === 200) {
        //login thành công, đưa dữ liệu lên localStorage và redux
        localStorage.setItem(LOGIN, JSON.stringify(result.data.content));
        localStorage.setItem("TOKEN", result.data.content.accessToken);
        dispatch({
          type: LOGIN,
          value: result.data.content,
        });
        // console.log("TOKEN -", TOKEN);
        //chuyển hướng đến home
        props.history.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
};
