import { http } from "../util/config";

export default class taskServices {
  getTaskStatus() {
    return http.get("api/Status/getAll");
  }
}
