import { http } from "../util/config";

export default class UserServices {
  login(data) {
    return http.post("api/Users/signin", data);
  }

  register(data) {
    return http.post("api/Users/signup", data);
  }
}
