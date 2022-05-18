import { userServices } from "../../services/baseService";
import { STATUS_CODE } from "../../util/config";

export const testTokenAction = (props) => {
  return async () => {
    try {
      let result = await userServices.checkLogin();
      console.log(result);
    } catch (error) {
      console.log(error);
      if (error.response.data.statusCode === STATUS_CODE.SERVER_ERROR) {
        props.history.push("/");
      } else {
        props.history.push("/login");
      }
      //   console.log(error)
    }
  };
};
