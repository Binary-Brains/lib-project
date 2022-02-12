import Cookies from 'js-cookie'
import { ACCEPET_REJECT_FAIL, ACCEPT_REJECT_REQUEST, ACCPETED_REJECTED, ADDED_BOOKS, ADD_BOOKS_FAILED, ADD_BOOKS_REQUEST, CREATE_LIBRARY_REQUEST, LIBRARY_CREATED, LIBRARY_CREATION_FAILED, LIBRARY_LOADED, LOAD_LIBRARY_FAILED, LOAD_LIIBRARY_REQUEST } from '../../constants/admin/library';

let initialState = {
  loading: true,
  libraryInfo: null,
  students: [],
  books: []
}

export const libraryRegisterReducer = (state = initialState, action) => {
    switch (action.type) {
      case CREATE_LIBRARY_REQUEST:
      case ADD_BOOKS_REQUEST:
      case LOAD_LIIBRARY_REQUEST:
      case ACCEPT_REJECT_REQUEST:
        return {...state, loading: true };
      case LIBRARY_CREATED:
      case LIBRARY_LOADED:
        return {
          ...state,
          loading: false,
          libraryInfo: action.payload.data[0]
        };
      case LIBRARY_CREATION_FAILED:
      case ADD_BOOKS_FAILED:
      case LOAD_LIBRARY_FAILED:
        return {
          ...state,
          loading: false,
          libraryInfo: null
        };
      case ADDED_BOOKS:
           return {
               ...state,
               loading: false,
               books: action.payload.data
           }
      case ACCPETED_REJECTED:
      case ACCEPET_REJECT_FAIL:
        return {
          ...state,
          loading: false
        }
      default:
        return state;
    }
  };