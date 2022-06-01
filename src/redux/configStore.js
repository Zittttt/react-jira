import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userReducer } from "./reducers/userReducer";
import { projectReducer } from "./reducers/projectReducer";
import loadingReducer from "./reducers/loadingReducer";
import notificationReducer from "./reducers/notificationReducer";
import { drawerReducer } from "./reducers/drawerReducer";
import { editorContentReducer } from "./reducers/editorContentReducer";
import { taskReducer } from "./reducers/taskReducer";
import modalReducer from "./reducers/modalReducer";
import commentReducer from "./reducers/commentReducer";
import { formikReducer } from "./reducers/formikReducer";

const rootReducer = combineReducers({
  //state
  userReducer,
  projectReducer,
  loadingReducer,
  notificationReducer,
  drawerReducer,
  editorContentReducer,
  taskReducer,
  modalReducer,
  commentReducer,
  formikReducer,
});

// const middleware = [thunk];
// const customCompose = composeWithDevTools(applyMiddleware(...middleware));

export const store = createStore(rootReducer, applyMiddleware(thunk));
