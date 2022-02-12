
import { ACCEPET_REJECT_FAIL, ACCEPT_REJECT_REQUEST, ACCPETED_REJECTED, ADDED_BOOKS, ADD_BOOKS_FAILED, ADD_BOOKS_REQUEST, CREATE_LIBRARY_REQUEST, LIBRARY_CREATED, LIBRARY_LOADED, LOAD_LIBRARY_FAILED, LOAD_LIIBRARY_REQUEST } from "../../constants/admin/library";
import axios from 'axios'
import { setAlert } from "../alert";
import { envUrl } from "../../utils/envUrl";

export const createLibrary = (details) => async (dispatch) => {
    dispatch({ type: CREATE_LIBRARY_REQUEST });
    try {
        await axios.post(`${envUrl}/api/library/cr_lib`, details).then(res => {
            dispatch({
                type: LIBRARY_CREATED,
                payload: res.data
            })
            dispatch(setAlert(`Library ${res.data.data.library_name} Created!!`, 'success'))
            return res.data
        })
    } catch (error) {
        console.log(error.message)
        dispatch(setAlert(error.response.data.message, 'error'))
        return error
    }
}

export const saveBook = (details) =>  async (dispatch) => {
    dispatch({type: ADD_BOOKS_REQUEST})
    try {
        await axios.post(`${envUrl}/api/library/add_book`, details).then(res => {
            dispatch({
                type: ADDED_BOOKS,
                payload: res.data
            });
            dispatch(setAlert("Books Added Successfully","success"));
        })
    } catch (error) {
        dispatch({
            type: ADD_BOOKS_FAILED
        })
        dispatch(setAlert(error.response.data.message, 'error'))
        return error
    }

}

//get the detail of a particular library
export const loadLibrary = (details) => async (dispatch) => {
    dispatch({type: LOAD_LIIBRARY_REQUEST})
    try {
        await axios.post(`${envUrl}/api/library/get_lib`, {library_id: details}).then(res => {
            dispatch({
                type: LIBRARY_LOADED,
                payload: res.data
            })
        })
    } catch (error) {
        console.log(error.message)
        dispatch({
            type: LOAD_LIBRARY_FAILED
        })
    }
}


//accept the request of the user
export const acceptRequest = (details) => async (dispatch) => {
    const {student_id, library_id, accept} = details;
    dispatch({type: ACCEPT_REJECT_REQUEST});
    try {
        await axios.post(`${envUrl}/api/library/accept_rqst/${student_id}`, {library_id, accept}).then(res => {
            dispatch({
                type: ACCPETED_REJECTED
            })
            dispatch(setAlert("Accepeted", 'success'));
            return res.data
        })
    } catch (error) {
        console.log(error.response);
        dispatch({
            type: ACCEPET_REJECT_FAIL
        })
        dispatch(setAlert(error.response.data.message, 'error'))
        return error
    }
}
