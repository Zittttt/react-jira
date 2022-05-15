import { LOGIN } from "../types/userLoginType";

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
      localStorage.setItem(LOGIN, JSON.stringify(action.value));
      localStorage.setItem("TOKEN", JSON.stringify(action.value.accessToken));
      state.userLogin = action.value;
      return { ...state };
    }
    default:
      return state;
  }
};
