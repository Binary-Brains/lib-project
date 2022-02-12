import { ADMIN_LOGIN, ADMIN_LOGIN_FAIL, ADMIN_LOGIN_REQUEST, ADMIN_REGISTRATION, ADMIN_REGISTRATION_FAIL, ADMIN_VERIFICATION, ADMIN_VERIFICATION_FAIL, USER_REGISTER_REQUEST, ADMIN_LOADED, ADMIN_LOADING, ADMIN_LOADING_FAIL, ADMIN_LOGOUT } from "../../constants/admin/auth";
import Cookies from 'js-cookie'

let initialState = {
  loading: false,
  isAuthenticated: false,
  token: null,
  adminInfo: null
}

export const adminRegisterReducer = (state = initialState, action) => {
    switch (action.type) {
      case USER_REGISTER_REQUEST:
      case ADMIN_LOGIN_REQUEST:
      case ADMIN_LOADING:
        return {...state, loading: true };
      case ADMIN_VERIFICATION:
      case ADMIN_REGISTRATION:
        return {
          ...state,
          loading: false,
          adminInfo: action.payload.data
        };
      case ADMIN_LOADED:
        return {
          ...state,
          loading: false,
          isAuthenticated: true,
          token: Cookies.get('cs_at'),
          adminInfo: action.payload.data
        }
      case ADMIN_LOGIN: 
        return {
          ...state,
          loading: false,
          isAuthenticated: true,
          token: action.payload.data.token,
          adminInfo: action.payload.data.profile_data,
        }
      case ADMIN_LOGIN_FAIL:
      case ADMIN_VERIFICATION_FAIL:
      case ADMIN_REGISTRATION_FAIL:
      case ADMIN_LOADING_FAIL:
      case ADMIN_LOGOUT:
        Cookies.remove('li_at')
        return {
          ...state,
          adminInfo: null,
          isAuthenticated: false,
          token: null,
          loading: false
        }
      default:
        return state;
    }
  };