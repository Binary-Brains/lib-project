import {
  BOOK_FEED_FAIL,
  BOOK_FEED_LOADED,
  BOOK_FEED_REQUEST,
  GET_CONNECTED_LIBRARY,
  GET_CONNECTED_LIBRARY_REQUEST,
  GET_LIBRARIES_FAIL,
  GET_LIBRARIES_REQUEST,
  GOT_LIBRARIES,
  LIBRARY_LOADED,
  LOAD_LIBRARY_FAIL,
  LOAD_LIBRARY_REQUEST,
  RESERVED_BOOK,
  RESERVE_BOOK_FAILED,
  RESERVE_BOOK_REQUEST,
  SEND_REQUEST_DONE,
  SEND_REQUEST_FAILED,
  SEND_REQUEST_STARTED,
} from "../../constants/student/library";

let initialState = {
  loading: true,
  libraryInfo: {},
  libraries: [],
  books: [],
  feeds: {},
};

export const libraryStudentRegisterReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LIBRARIES_REQUEST:
    case GET_CONNECTED_LIBRARY_REQUEST:
    case LOAD_LIBRARY_REQUEST:
    case RESERVE_BOOK_REQUEST:
    case BOOK_FEED_REQUEST:
      return { ...state, loading: true, libraries: null, feeds: null, connectedLibraries: null };
    case SEND_REQUEST_STARTED:
      return {
        ...state,
        loading: true
      }
    case LIBRARY_LOADED:
      return {
        ...state,
        loading: false,
        libraryInfo: action.payload.data[0],
      };
    case LOAD_LIBRARY_FAIL:
      return {
        ...state,
        loading: false,
        libraryInfo: null,
      };
    case GOT_LIBRARIES:
      return {
        ...state,
        loading: false,
        libraries: action.payload.data,
      };
    case GET_LIBRARIES_FAIL:
      return {
        ...state,
        loading: false,
        libraries: null,
      };
    case BOOK_FEED_LOADED:
      return {
        ...state,
        loading: false,
        feeds: action.payload.data[0],
      };
    case BOOK_FEED_FAIL:
    case SEND_REQUEST_DONE:
    case SEND_REQUEST_FAILED:
    case RESERVED_BOOK:
    case RESERVE_BOOK_FAILED:
      return {
        ...state,
        loading: false,
        feeds: null
      };
    case GET_CONNECTED_LIBRARY:
      return {
        ...state,
        loading: false,
        connectedLibraries: action.payload.data,
      };
    default:
      return state;
  }
};
