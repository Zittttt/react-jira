import { useHistory } from "react-router-dom";
import { LOGIN } from "../types/userType";

let user = {};

if (localStorage.getItem(LOGIN)) {
  user = JSON.parse(localStorage.getItem(LOGIN));
}

const stateDefault = {
  userLogin: user,
};

export const userReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case LOGIN: {
      state.userLogin = action.value;
      return { ...state };
    }
    default:
      return state;
  }
};
