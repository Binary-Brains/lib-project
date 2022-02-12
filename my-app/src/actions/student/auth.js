import setAuthToken from "../../utils/setAuthToken";
import { setAlert } from "../alert";

const axios = require("axios");
const  {USER_REGISTER_REQUEST, STUDENT_REGISTRATION, STUDENT_REGISTRATION_FAIL, STUDENT_VERIFICATION_FAIL, STUDENT_VERIFICATION, STUDENT_LOGIN_REQUEST, STUDENT_LOGIN, STUDENT_LOGIN_FAIL, STUDENT_LOADED, STUDENT_LOADING, STUDENT_LOADING_FAIL, STUDENT_LOGOUT} = require("../../constants/student/auth")
const Cookies = require('js-cookie')

export const StudentSignup = (details) => async (dispatch) => {
 dispatch({ type: USER_REGISTER_REQUEST});
 //now only sending request to backend take the response data and save accordingly and use everywhere
 try {
     await axios.post("/api/student/cr_acc", details).then((res) => {
        dispatch({
           type: STUDENT_REGISTRATION,
           payload: res.data
        });
        dispatch(setAlert(`Hi!,${res.data.data.student_name} an Email has been sent with a verification link!`,'success'))
        return res.data
     })
    //  dispatch({type: USER_REGISTERED, payload: res.data})
 } catch (error) {
    console.log(error.message)
    dispatch({
       type: STUDENT_REGISTRATION_FAIL
    })
    dispatch(setAlert(error.response.data.message, "error"));
    return error

 }
}

export const StudentVerify = (id) => async (dispatch) => {
   dispatch({ type: USER_REGISTER_REQUEST});
   //now only sending request to backend take the response data and save accordingly and use everywhere
   try {
       await axios.get(`/api/student/verify/${id}`).then((res) => {
          dispatch({
             type: STUDENT_VERIFICATION,
             payload: res.data
          });
          dispatch(setAlert(`Hi!,${res.data.data.student_name} You can login`,'success'))
          return res.data
       })
      //  dispatch({type: USER_REGISTERED, payload: res.data})
   } catch (error) {
      console.log(error.message)
      dispatch({
         type: STUDENT_VERIFICATION_FAIL
      })
      dispatch(setAlert(error.response.data.message, "error"));
      return error
  
   }
}

export const StudentSignin = (details) => async (dispatch) => {
   dispatch({ type: STUDENT_LOGIN_REQUEST});
   //now only sending request to backend take the response data and save accordingly and use everywhere
   try {
       await axios.post(`/api/student/login`, details).then((res) => {
          dispatch({
             type: STUDENT_LOGIN,
             payload: res.data
          });
          dispatch(setAlert(`Hi ${res.data.data.profile_data.student_name}, Welcome to Library`,'success'))
          console.log(details.remember_me)
          if(details.remember_me == "remember") Cookies.set("li_at", res.data.data.token)
          return res.data
       })
      //  dispatch({type: USER_REGISTERED, payload: res.data})
   } catch (error) {
      console.log(error.message)
      dispatch({
         type: STUDENT_LOGIN_FAIL
      })
      dispatch(setAlert(error.response.data.message, "error"));
      return error
  
   }
}

export const StudentLoad = () => async (dispatch) => {
   if(Cookies.get('li_at')){
      dispatch({ type: STUDENT_LOADING});
      setAuthToken(Cookies.get('li_at'))
   //now only sending request to backend take the response data and save accordingly and use everywhere
   try {
       await axios.get(`/api/student/student_profile` ).then((res) => {
          dispatch({
             type: STUDENT_LOADED,
             payload: res.data
          });
         //  dispatch(setAlert(`Hi ${res.data.data.student_name}, Welcome to Library`,'success'))
          return res.data
       })
      //  dispatch({type: USER_REGISTERED, payload: res.data})
   } catch (error) {
      console.log(error.message)
      dispatch({
         type: STUDENT_LOADING_FAIL
      })
      dispatch(setAlert("Please Login/Signup", "info"));
      return error
  
   }
   }
}

//student logout
export const StudentLogout = () => async (dispatch) => {
   dispatch({type: STUDENT_LOGOUT})
}