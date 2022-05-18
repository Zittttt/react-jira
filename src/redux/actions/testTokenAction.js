import { userServices } from "../../services/baseService";

export const testTokenAction = (props) => {
  return async () => {
    try {
      let result = await userServices.checkLogin();
      console.log(result);
    } catch (error) {
      console.log("test token", error);
      if (error.response.data.statusCode == 500) {
        console.log("đã login");
        props.history.push("/");
      } else {
        console.log("chưa login");
        props.history.push("/login");
      }
      //   console.log(error)
    }
  };
};
