import { GET_LIBRARIES_FAIL, GET_LIBRARIES_REQUEST, GOT_LIBRARIES, SEND_REQUEST_DONE, SEND_REQUEST_FAILED, SEND_REQUEST_STARTED } from '../../constants/student/library';

let initialState = {
  loading: true,
  libraryInfo: {},
  libraries: [],
  books: []
}

export const libraryStudentRegisterReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_LIBRARIES_REQUEST:
        case SEND_REQUEST_STARTED:
        return {...state, loading: true };
      case GOT_LIBRARIES:
        return {
          ...state,
          loading: false,
          libraries: action.payload.data
        };
      case GET_LIBRARIES_FAIL:
        return {
          ...state,
          loading: false,
          libraries: null
        };
    case SEND_REQUEST_DONE:
        return {
            ...state,
            loading: false,
        }
    case SEND_REQUEST_FAILED:
        return {
            ...state,
            loading: false
        }
      default:
        return state;
    }
  };