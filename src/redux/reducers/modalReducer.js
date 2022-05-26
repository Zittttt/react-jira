import { CLOSE_MODAL, OPEN_MODAL } from "../../util/constant/configSystem";

const initialState = {
  isModalVisible: false,
  modalContent: "",
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
    default:
      return state;
  }
};
