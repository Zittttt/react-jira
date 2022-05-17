import { GET_PROJECT } from "../types/projectType";

const stateDefault = { projectArr: {} };

export const projectReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case GET_PROJECT:
      state.projectArr = action.project;
      return { ...state };

    default:
      return state;
  }
};
