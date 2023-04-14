import { setCookie, getCookie } from "../../cookie/cookie";
import {
  postToResetPassword,
  login,
  registerNewUser,
  postEmailToGetCode,
  getUser,
  logOut,
  changeUserData,
} from "../../utils/funcs";
import { CLEAR_CONSTRUCTOR } from "./burgerConstructor";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const AUTH_CHECK = "AUTH_CHECK";
export const AUTH_REQUEST = "AUTH_REQUEST";
export const CHANGE_USER_DATA_SUCCESS = "CHANGE_USER_DATA_SUCCESS";
export const CODE_TO_RESET_SUCCESS = "CODE_TO_RESET_SUCCESS";
export const AUTH_FAILURE = "AUTH_FAILURE";
export const REGISTRATION_SUCCESS = "REGISTRATION_SUCCESS";
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
//проверка токеа на валидность реализована в функции fetchWithRefresh в funcs
export const checkUserAuth = () => {
  return function (dispatch) {
    if (getCookie("accessToken")) {
      dispatch({
        type: AUTH_REQUEST,
      });
      getUser()
        .then((res) => {
          console.log(res);
          dispatch({ type: GET_USER_SUCCESS, payload: res.user });
        })
        .catch((err) => {
          dispatch({
            type: AUTH_FAILURE,
            payload: err,
          });
        })
        .finally(dispatch({ type: AUTH_CHECK }));
    } else {
      dispatch({ type: AUTH_CHECK });
    }
  };
};

export const getCodeToResetPassword = (email, callback) => {
  return function (dispatch) {
    dispatch({ type: AUTH_REQUEST });
    postEmailToGetCode(email)
      .then(() => {
        dispatch({ type: CODE_TO_RESET_SUCCESS });
        callback();
      })
      .catch((err) => {
        dispatch({
          type: AUTH_FAILURE,
          payload: err,
        });
      });
  };
};

export const registerNewUserAction = (inputData) => {
  return function (dispatch) {
    dispatch({ type: AUTH_REQUEST });
    registerNewUser(inputData)
      .then((res) => {
        localStorage.setItem("refreshToken", res.refreshToken);
        setCookie("accessToken", res.accessToken.split("Bearer")[1]);
        dispatch({ type: REGISTRATION_SUCCESS, payload: res.user });
      })
      .catch((err) => {
        dispatch({
          type: AUTH_FAILURE,
          payload: err,
        });
      });
  };
};

export const getRequestToResetPassword = (inputData, callback) => {
  return function (dispatch) {
    dispatch({ type: AUTH_REQUEST });
    postToResetPassword(inputData)
      .then(() => {
        dispatch({
          type: RESET_PASSWORD_SUCCESS,
        });
        callback();
      })
      .catch((err) => {
        dispatch({
          type: AUTH_FAILURE,
          payload: err,
        });
      });
  };
};

export const loginAction = (inputData) => {
  return function (dispatch) {
    dispatch({ type: AUTH_REQUEST });
    login(inputData)
      .then((res) => {
        console.log(res);
        localStorage.setItem("refreshToken", res.refreshToken);
        setCookie("accessToken", res.accessToken.split("Bearer")[1]);
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.user,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: AUTH_FAILURE,
          payload: err,
        });
      });
  };
};

export const logOutAction = () => {
  return function (dispatch) {
    dispatch({ type: AUTH_REQUEST });
    logOut()
      .then(() => {
        dispatch({ type: LOGOUT_SUCCESS });
        dispatch({ type: CLEAR_CONSTRUCTOR });
      })
      .catch((err) => {
        dispatch({
          type: AUTH_FAILURE,
          payload: err,
        });
      });
  };
};

export const changeUserDataAction = (data) => {
  return function (dispatch) {
    dispatch({ type: AUTH_REQUEST });
    changeUserData(data)
      .then((res) => {
        dispatch({ type: CHANGE_USER_DATA_SUCCESS, payload: res.user });
      })
      .catch((err) => {
        dispatch({
          type: AUTH_FAILURE,
          payload: err,
        });
      });
  };
};
