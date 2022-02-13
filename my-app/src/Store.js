import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { adminRegisterReducer } from "./reducers/admin/auth";
import { libraryRegisterReducer } from "./reducers/admin/libray";
import alertReducer from "./reducers/alert";

import { userRegisterReducer } from "./reducers/student/auth";
import { libraryStudentRegisterReducer } from "./reducers/student/library";

const initialState = {
  userSignin: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
};
const reducer = combineReducers({
  userRegister: userRegisterReducer,
  adminRegister: adminRegisterReducer,
  libraryRegister: libraryRegisterReducer,
  libraryStudentRegister: libraryStudentRegisterReducer,
  error: alertReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
