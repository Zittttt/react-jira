import { LOGIN } from "../redux/types/userType";
import { http, TOKEN } from "../util/config";

export default class UserServices {
  login(data) {
    return http.post("api/Users/signin", data);
  }

  register(data) {
    return http.post("api/Users/signup", data);
  }

  checkLogin = () => {
    return http.post("api/Users/TestToken");
  };

  getAllUser = (keyword) => {
    return http.get(`api/Users/getUser?keyword=${keyword}`);
  };
}
