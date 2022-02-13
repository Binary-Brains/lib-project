import {
  ACCEPET_REJECT_FAIL,
  ACCEPT_REJECT_REQUEST,
  ACCPETED_REJECTED,
  ADDED_BOOKS,
  ADD_BOOKS_FAILED,
  ADD_BOOKS_REQUEST,
  CREATE_LIBRARY_REQUEST,
  ISSUED_BOOK,
  ISSUE_BOOK_FAIL,
  ISSUE_BOOK_START,
  LIBRARY_CREATED,
  LIBRARY_LOADED,
  LOADED_STUDENT,
  LOAD_LIBRARY_FAILED,
  LOAD_LIIBRARY_REQUEST,
  LOAD_STUDENT_FAIL,
  LOAD_STUDENT_REQUEST,
  RETURNED_BOOK,
  RETURN_BOOK_FAIL,
  RETURN_BOOK_REQUEST,
} from "../../constants/admin/library";
import axios from "axios";
import { setAlert } from "../alert";
import { envUrl } from "../../utils/envUrl";

export const createLibrary = (details) => async (dispatch) => {
  dispatch({ type: CREATE_LIBRARY_REQUEST });
  try {
    await axios.post(`${envUrl}/api/library/cr_lib`, details).then((res) => {
      dispatch({
        type: LIBRARY_CREATED,
        payload: res.data,
      });
      dispatch(
        setAlert(`Library ${res.data.data.library_name} Created!!`, "success")
      );
      return res.data;
    });
  } catch (error) {
    console.log(error.message);
    dispatch(setAlert(error.response.data.message, "error"));
    return error;
  }
};

export const saveBook = (details) => async (dispatch) => {
  dispatch({ type: ADD_BOOKS_REQUEST });
  try {
    await axios.post(`${envUrl}/api/library/add_book`, details).then((res) => {
      dispatch({
        type: ADDED_BOOKS,
        payload: res.data,
      });
      dispatch(setAlert("Books Added Successfully", "success"));
    });
  } catch (error) {
    dispatch({
      type: ADD_BOOKS_FAILED,
    });
    dispatch(setAlert(error.response.data.message, "error"));
    return error;
  }
};

//get the detail of a particular library
export const loadLibrary = (details) => async (dispatch) => {
  dispatch({ type: LOAD_LIIBRARY_REQUEST });
  try {
    await axios
      .post(`${envUrl}/api/library/get_lib`, { library_id: details })
      .then((res) => {
        dispatch({
          type: LIBRARY_LOADED,
          payload: res.data,
        });
      });
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: LOAD_LIBRARY_FAILED,
    });
  }
};

//accept the request of the user
export const acceptRequest = (details) => async (dispatch) => {
  const { student_id, library_id, accept } = details;
  dispatch({ type: ACCEPT_REJECT_REQUEST });
  try {
    await axios
      .post(`${envUrl}/api/library/accept_rqst/${student_id}`, {
        library_id,
        accept,
      })
      .then((res) => {
        dispatch({
          type: ACCPETED_REJECTED,
        });
        dispatch(setAlert("Accepeted", "success"));
        return res.data;
      });
  } catch (error) {
    console.log(error.response);
    dispatch({
      type: ACCEPET_REJECT_FAIL,
    });
    dispatch(setAlert(error.response.data.message, "error"));
    return error;
  }
};

//issue a book
export const issueUnReserveBook = (details) => async (dispatch) => {
  dispatch({ type: ISSUE_BOOK_START });
  try {
    await axios
      .post(`${envUrl}/api/library/issue_book`, details)
      .then((res) => {
        dispatch({
          type: ISSUED_BOOK,
          payload: res.data,
        });
        dispatch(setAlert("Book Issued", "successs"));
        return res.data;
      });
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: ISSUE_BOOK_FAIL,
    });
    dispatch(setAlert(error.response && error.response.data.message, "error"));
    return error;
  }
};

export const issueReserveBook = (details) => async (dispatch) => {
  dispatch({ type: ISSUE_BOOK_START });
  try {
    await axios
      .post(`${envUrl}/api/library/issue_book`, details)
      .then((res) => {
        dispatch({
          type: ISSUED_BOOK,
          payload: res.data,
        });
        dispatch(setAlert("Book Issued", "success"));
        return res.data;
      });
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: ISSUE_BOOK_FAIL,
    });
    dispatch(setAlert(error.response && error.response.data.message, "error"));
    return error;
  }
};

//get the student dashboard page details
export const getStudentDashboardDetails = (details) => async (dispatch) => {
  dispatch({ type: LOAD_STUDENT_REQUEST });
  try {
    await axios
      .post(`${envUrl}/api/library/student_history`, { student_id: details })
      .then((res) => {
        dispatch({
          type: LOADED_STUDENT,
          payload: res.data,
        });
        return res.data;
      });
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: LOAD_STUDENT_FAIL,
    });
    dispatch(
      setAlert(
        error.response && error.response.data && error.response.data.message,
        "error"
      )
    );
    return error;
  }
};

//return the book
export const returnBook = (details) => async (dispatch) => {
  dispatch({ type: RETURN_BOOK_REQUEST });
  try {
    await axios
      .post(`${envUrl}/api/library/return_book`, { history_id: details })
      .then((res) => {
        dispatch({
          type: RETURNED_BOOK,
          payload: res.data,
        });
        dispatch(setAlert("Book Returned!", "success"));
        return res.data;
      });
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: RETURN_BOOK_FAIL,
    });
    dispatch(setAlert(error.response.data.message, "error"));
    return error;
  }
};
