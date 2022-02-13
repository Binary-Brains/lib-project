import {
  STUDENT_LOGIN,
  STUDENT_LOGIN_FAIL,
  STUDENT_LOGIN_REQUEST,
  STUDENT_REGISTRATION,
  STUDENT_REGISTRATION_FAIL,
  STUDENT_VERIFICATION,
  STUDENT_VERIFICATION_FAIL,
  USER_REGISTER_REQUEST,
  STUDENT_LOADED,
  STUDENT_LOADING,
  STUDENT_LOADING_FAIL,
  STUDENT_LOGOUT,
  STUDENT_UPDATED,
  STUDENT_UPDATE_REQUEST,
  STUDENT_UPDATE_FAIL,
} from "../../constants/student/auth";
import Cookies from "js-cookie";

let initialState = {
  loading: false,
  isAuthenticated: false,
  token: false,
};

export const userRegisterReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
    case STUDENT_LOGIN_REQUEST:
    case STUDENT_LOADING:
    case STUDENT_UPDATE_REQUEST:
      return { ...state, loading: true };
    case STUDENT_VERIFICATION:
    case STUDENT_REGISTRATION:
    case STUDENT_UPDATED:
      return {
        ...state,
        loading: false,
        studentInfo: action.payload.data,
      };
    case STUDENT_LOADED:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        token: Cookies.get("li_at"),
        studentInfo: action.payload.data,
      };
    case STUDENT_LOGIN:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        token: action.payload.data.token,
        studentInfo: action.payload.data.profile_data,
      };
    case STUDENT_UPDATE_FAIL:
    case STUDENT_LOGIN_FAIL:
    case STUDENT_VERIFICATION_FAIL:
    case STUDENT_REGISTRATION_FAIL:
    case STUDENT_LOADING_FAIL:
    case STUDENT_LOGOUT:
      Cookies.remove("li_at");
      return {
        ...state,
        studentInfo: null,
        isAuthenticated: false,
        token: null,
        loading: false,
      };
    default:
      return state;
  }
};
