import { http } from "../util/config";

export default class ProjectServices {
  getProject(keyword) {
    return keyword
      ? http.get(`api/Project/getAllProject?keyword=${keyword}`)
      : http.get("api/Project/getAllProject");
  }

  getProjectCategory() {
    return http.get("api/ProjectCategory");
  }
}
