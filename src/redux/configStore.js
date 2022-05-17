import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userReducer } from "./reducers/userReducer";
import { projectReducer } from "./reducers/projectReducer";

const rootReducer = combineReducers({
  //state
  userReducer: userReducer,
  projectReducer: projectReducer,
});

const middleware = [thunk];
const customCompose = composeWithDevTools(applyMiddleware(...middleware));

export const store = createStore(rootReducer, customCompose);
