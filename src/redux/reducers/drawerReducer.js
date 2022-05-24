import {
  CLOSE_DRAWER,
  OPEN_CREATE_TASK_FORM,
  OPEN_DRAWER,
  OPEN_PROJECT_EDIT_FORM,
  SET_SUBMIT_FUNCTION,
} from "../../util/constant/configSystem";

const initialState = {
  visible: false,
  formContent: "",
  callBackSubmit: (props) => {
    alert("Submit");
  },
  title: "",
};

export const drawerReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_DRAWER:
      return { ...state, visible: true };
    case CLOSE_DRAWER:
      return { ...state, visible: false };
    case OPEN_PROJECT_EDIT_FORM:
      return {
        ...state,
        visible: true,
        formContent: action.Component,
        title: "Project edit",
      };
    case SET_SUBMIT_FUNCTION: {
      state.callBackSubmit = action.function;
      return { ...state };
    }
    case OPEN_CREATE_TASK_FORM: {
      return {
        ...state,
        visible: true,
        formContent: action.Component,
        title: "Create task",
      };
    }
    default:
      return state;
  }
};
