import { GET_TASK_STATUS } from "../../util/constant/configSystem";

const initialState = {
  taskStatus: [],
};

export const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TASK_STATUS:
      return { ...state, taskStatus: action.value };

    default:
      return state;
  }
};
