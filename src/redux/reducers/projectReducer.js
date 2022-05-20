import { GET_PROJECT_EDIT } from "../../util/constant/configSystem";
import { GET_CATEGORY, GET_PROJECT } from "../types/projectType";

const stateDefault = {
  projectArr: [],
  categoryArr: [],
  projectEdit: {
    alias: "project-ch",
    creator: { id: 1779, name: "dinh" },
    description: "<p>Hello</p>",
    id: 4603,
    projectCategory: { id: 1, name: "Dự án web" },
    projectName: "Project CH",
  },
};

export const projectReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case GET_PROJECT: {
      state.projectArr = action.value;
      return { ...state };
    }
    case GET_CATEGORY: {
      state.categoryArr = action.value;
      return { ...state };
    }
    case GET_PROJECT_EDIT: {
      return { ...state, projectEdit: action.data };
    }
    default:
      return state;
  }
};
