import { GET_PROJECT_DETAIL } from "../../util/constant/configSystem";
import { GET_CATEGORY, GET_PROJECT } from "../types/projectType";

const stateDefault = {
  projectArr: [],
  categoryArr: [],
  projectDetail: {},
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
    case GET_PROJECT_DETAIL: {
      return { ...state, projectDetail: action.data };
    }
    default:
      return state;
  }
};
