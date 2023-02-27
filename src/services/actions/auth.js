import { setCookie, getCookie } from "../../cookie/cookie";
import {
  postToResetPassword,
  login,
  registerNewUser,
  postEmailToGetCode,
  getUser,
  logout,
  logOut,
  changeUserData,
} from "../../utils/funcs";
import { useNavigate } from "react-router-dom";
export const GET_USER_REQUEST = "GET_USER_REQUEST";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_FAILURE = "GET_USER_FAILURE";
export const AUTH_CHECK = "AUTH_CHECK";

export const checkUserAuth = () => {
  return function (dispatch) {
    if (getCookie("accessToken")) {
      console.log("in checkuserauth");
      dispatch({
        type: GET_USER_REQUEST,
      });
      getUser()
        .then((res) => {
          if (res.success) {
            dispatch({ type: GET_USER_SUCCESS });
          }
        })
        .catch((err) => {
          dispatch({
            type: GET_USER_FAILURE,
            payload: err,
          });
        })
        .finally(dispatch({ type: AUTH_CHECK }));
    } else {
      console.log("no token");
      dispatch({ type: AUTH_CHECK });
    }
  };
};

export const CODE_TO_RESET_REQUEST = "CODE_TO_RESET_REQUEST";
export const CODE_TO_RESET_SUCCESS = "CODE_TO_RESET_SUCCESS";
export const CODE_TO_RESET_FAILURE = "CODE_TO_RESET_FAILURE";

export const getCodeToResetPassword = (email) => {
  return function (dispatch) {
    dispatch({ type: CODE_TO_RESET_REQUEST });
    postEmailToGetCode(email)
      .then((res) => {
        if (res.success) {
          dispatch({ type: CODE_TO_RESET_SUCCESS });
        }
      })
      .catch((err) => {
        dispatch({
          type: CODE_TO_RESET_FAILURE,
          payload: err,
        });
      });
  };
};

export const REGISTRATION_SUCCESS = "REGISTRATION_SUCCESS";
export const REGISTRATION_FAILURE = "REGISTRATION_FAILURE";
export const REGISTRATION_REQUEST = "REGISTRATION_REQUEST";

export const registerNewUserAction = (inputData) => {
  return function (dispatch) {
    dispatch({ type: REGISTRATION_REQUEST });
    registerNewUser(inputData)
      .then((res) => {
        console.log(res);
        if (res.success) {
          localStorage.setItem("refreshToken", res.refreshToken);
          setCookie("accessToken", res.accessToken.split("Bearer")[1]);
          dispatch({ type: REGISTRATION_SUCCESS, payload: res.user });
        }
      })
      .catch((err) => {
        dispatch({
          type: REGISTRATION_FAILURE,
          payload: err,
        });
      });
  };
};

export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_FAILURE = "RESET_PASSWORD_FAILURE";
export const RESET_PASSWORD_REQUEST = "RESET_PASSWORD_REQUEST";

export const getRequestToResetPassword = (inputData) => {
  return function (dispatch) {
    dispatch({ type: RESET_PASSWORD_REQUEST });
    postToResetPassword(inputData)
      .then((res) => {
        if (res.success) {
          dispatch({
            type: RESET_PASSWORD_SUCCESS,
            payload: true,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: RESET_PASSWORD_FAILURE,
          payload: err,
        });
      });
  };
};

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
//добавить добавление токенов

export const loginAction = (inputData) => {
  return function (dispatch) {
    dispatch({ type: LOGIN_REQUEST });
    login(inputData)
      .then((res) => {
        if (res.success) {
          localStorage.setItem("refreshToken", res.refreshToken);
          setCookie("accessToken", res.accessToken.split("Bearer")[1]);
          dispatch({
            type: LOGIN_SUCCESS,
            payload: res.user,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: LOGIN_FAILURE,
          payload: err.message,
        });
      });
  };
};
export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "LOGOUT_FAILURE";
export const logOutAction = () => {
  return function (dispatch) {
    dispatch({ type: LOGOUT_REQUEST });
    logOut()
      .then((res) => {
        if (res.success) {
          dispatch({ type: LOGOUT_SUCCESS, payload: null });
        }
      })
      .catch((err) => {
        dispatch({
          type: LOGOUT_FAILURE,
          payload: err.message,
        });
      });
  };
};

export const CHANGE_USER_DATA_REQUEST = "CHANGE_USER_DATA_REQUEST";
export const CHANGE_USER_DATA_SUCCESS = "CHANGE_USER_DATA_SUCCESS";
export const CHANGE_USER_DATA_FAILURE = "CHANGE_USER_DATA_FAILURE";
export const changeUserDataAction = (data) => {
  return function (dispatch) {
    dispatch({ type: CHANGE_USER_DATA_REQUEST });
    changeUserData(data)
      .then((res) => {
        console.log(res);
        if (res.success) {
          dispatch({ type: CHANGE_USER_DATA_SUCCESS, payload: res.user });
        }
      })
      .catch((err) => {
        dispatch({
          type: CHANGE_USER_DATA_FAILURE,
          payload: err.message,
        });
      });
  };
};
