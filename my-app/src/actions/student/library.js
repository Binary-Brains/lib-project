import axios from "axios";
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
import { envUrl } from "../../utils/envUrl";
import { setAlert } from "../alert";

export const loadLibraries = () => async (dispatch) => {
  dispatch({ type: GET_LIBRARIES_REQUEST });
  try {
    await axios.get(`${envUrl}/api/student/lib_list`).then((res) => {
      dispatch({
        type: GOT_LIBRARIES,
        payload: res.data,
      });
      // dispatch(setAlert(`${res.data?.data?.length} Libraries Found!!`, 'success'))
      return res.data;
    });
  } catch (error) {
    console.log(error.response);
    dispatch({
      type: GET_LIBRARIES_FAIL,
    });
    dispatch(setAlert(error.response.data.message, "error"));
    return error;
  }
};

//send a request to library
export const sendRequest = (id) => async (dispatch) => {
  dispatch({ type: SEND_REQUEST_STARTED });
  try {
    await axios.post(`${envUrl}/api/student/lib_rqst/${id}`).then((res) => {
      dispatch({
        type: SEND_REQUEST_DONE,
        payload: res.data,
      });
      dispatch(setAlert("Request Sent", "success"));
      return res.data;
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: SEND_REQUEST_FAILED,
    });
    dispatch(
      setAlert(
        error &&
          error.response &&
          error.response.data &&
          error.response.data.message,
        "error"
      )
    );
  }
};

//get the list of the connected libraries
export const getConnectedLibraries = () => async (dispatch) => {
  dispatch({ type: GET_CONNECTED_LIBRARY_REQUEST });
  try {
    await axios
      .get(`${envUrl}/api/student/getConnectedLibraries`)
      .then((res) => {
        dispatch({
          type: GET_CONNECTED_LIBRARY,
          payload: res.data,
        });
        return res.data;
      });
  } catch (error) {
    console.log(error.repsonse);
    dispatch({
      type: SEND_REQUEST_FAILED,
    });
    dispatch(
      setAlert(
        error &&
          error.response &&
          error.response.data &&
          error.response.data.message,
        "error"
      )
    );
  }
};

//get a library dashboard
export const getLibraryData = (details) => async (dispatch) => {
  dispatch({ type: LOAD_LIBRARY_REQUEST });
  try {
    await axios
      .post(`${envUrl}/api/student/library_history`, details)
      .then((res) => {
        dispatch({
          type: LIBRARY_LOADED,
          payload: res.data,
        });
        return res.data;
      });
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: LOAD_LIBRARY_FAIL,
    });
    return error;
  }
};

//reserve a book
export const reserveBook = (details) => async (dispatch) => {
  dispatch({ type: RESERVE_BOOK_REQUEST });
  try {
    await axios
      .post(`${envUrl}/api/student/reserve_book`, details)
      .then((res) => {
        dispatch({
          type: RESERVED_BOOK,
          payload: res.data,
        });
        dispatch(setAlert("Book Reserved Successfully!", "success"));
        return res.data;
      });
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: RESERVE_BOOK_FAILED,
    });
    dispatch(setAlert(error.response && error.response.data.message, "error"));
    return error;
  }
};

//load all the feeds of the book by the student
export const loadFeed = () => async (dispatch) => {
  dispatch({ type: BOOK_FEED_REQUEST });
  try {
    await axios.get(`${envUrl}/api/student/book_feed`).then((res) => {
      dispatch({
        type: BOOK_FEED_LOADED,
        payload: res.data,
      });
      return res.data;
    });
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: BOOK_FEED_FAIL,
    });
    dispatch(setAlert(error.response.data.message, "error"));
    return error;
  }
};
