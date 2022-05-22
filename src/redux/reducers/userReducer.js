import { useHistory } from "react-router-dom";
import { GET_ALL_USER, USER_LOGIN } from "../../util/constant/configSystem";
import { LOGIN } from "../types/userType";

let user = {};

if (localStorage.getItem(USER_LOGIN)) {
  user = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const stateDefault = {
  userLogin: user,
  userSearch: [],
};

export const userReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case LOGIN: {
      state.userLogin = action.value;
      return { ...state };
    }
    case GET_ALL_USER:
      return { ...state, userSearch: action.value };
    default:
      return state;
  }
};
