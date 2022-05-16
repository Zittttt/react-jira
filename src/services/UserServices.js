import { LOGIN } from "../redux/types/userLoginType";
import { http } from "../util/config";

export default class UserServices {
  login(data) {
    return http.post("api/Users/signin", data);
  }

  register(data) {
    return http.post("api/Users/signup", data);
  }

  checkLogin(props) {
    let loginStatus = JSON.parse(localStorage.getItem(LOGIN));
    return loginStatus ? props.history.push("/") : props.history.push("/login");
  }
}
