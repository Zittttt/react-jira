import {
  CLOSE_DRAWER,
  OPEN_DRAWER,
  OPEN_PROJECT_EDIT_FORM,
  SET_SUBMIT_EDIT_PROJECT_FUNCTION,
} from "../../util/constant/configSystem";

const initialState = {
  visible: false,
  formContent: "",
  callBackSubmit: (props) => {
    alert("Submit");
  },
};

export const drawerReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_DRAWER:
      return { ...state, visible: true };
    case CLOSE_DRAWER:
      return { ...state, visible: false };
    case OPEN_PROJECT_EDIT_FORM:
      return { ...state, visible: true, formContent: action.Component };
    case SET_SUBMIT_EDIT_PROJECT_FUNCTION: {
      state.callBackSubmit = action.function;
      return { ...state };
    }
    default:
      return state;
  }
};
