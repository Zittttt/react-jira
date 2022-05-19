import {
  CLOSE_DRAWER,
  OPEN_DRAWER,
  OPEN_PROJECT_EDIT_FORM,
} from "../../util/constant/configSystem";

const initialState = {
  visible: false,
  formContent: <p>formContent</p>,
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
    default:
      return state;
  }
};
