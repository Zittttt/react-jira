import { http } from "../util/config";

export default class projectService {
  getProject(data) {
    return http.put(`api/Project/getAllProject?keyword=${data}`);
  }
}
