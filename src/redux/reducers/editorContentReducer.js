import { POST_EDITOR_CONTENT } from "../../util/constant/configSystem";

const initialState = {
  content: "",
};

export const editorContentReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_EDITOR_CONTENT:
      return { ...state, content: action.value };

    default:
      return state;
  }
};
