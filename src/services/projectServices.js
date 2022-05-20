import { http } from "../util/config";

export default class ProjectServices {
  getProject(keyword) {
    return keyword
      ? http.get(`api/Project/getAllProject?keyword=${keyword}`)
      : http.get("api/Project/getAllProject");
  }

  getProjectDetail(id) {
    return http.get(`api/Project/getProjectDetail?id=${id}`);
  }

  getProjectCategory() {
    return http.get("api/ProjectCategory");
  }

  updateProject(data) {
    return http.put(`api/Project/updateProject?projectId=${data.id}`, data);
  }
}
