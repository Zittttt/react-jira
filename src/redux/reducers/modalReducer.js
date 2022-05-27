import {
  CLOSE_MODAL,
  OPEN_MODAL,
  SET_SUBMIT_FUNCTION,
} from "../../util/constant/configSystem";

const initialState = {
  isModalVisible: false,
  modalContent: "",
  callBackSubmit: () => {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case OPEN_MODAL:
      return {
        ...state,
        isModalVisible: true,
        modalContent: action.modalContent,
      };
    case CLOSE_MODAL:
      return { ...state, isModalVisible: false, modalContent: "" };

    case SET_SUBMIT_FUNCTION:
      return { ...state, callBackSubmit: action.function };
    default:
      return state;
  }
};
