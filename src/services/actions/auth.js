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

export const checkUserAuth = () => {
  return function (dispatch) {
    console.log("in checkUserAuth");
    if (getCookie("accessToken")) {
      dispatch({
        type: AUTH_REQUEST,
      });
      getUser()
        .then((res) => {
          console.log("in getUser chance");
          if (res.success) {
            dispatch({ type: GET_USER_SUCCESS, payload: res.user });
          }
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

export const getCodeToResetPassword = (email) => {
  return function (dispatch) {
    dispatch({ type: AUTH_REQUEST });
    postEmailToGetCode(email)
      .then((res) => {
        if (res.success) {
          dispatch({ type: CODE_TO_RESET_SUCCESS });
        }
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
        console.log(res);
        if (res.success) {
          localStorage.setItem("refreshToken", res.refreshToken);
          setCookie("accessToken", res.accessToken.split("Bearer")[1]);
          dispatch({ type: REGISTRATION_SUCCESS, payload: res.user });
        }
      })
      .catch((err) => {
        dispatch({
          type: AUTH_FAILURE,
          payload: err,
        });
      });
  };
};

export const getRequestToResetPassword = (inputData) => {
  return function (dispatch) {
    dispatch({ type: AUTH_REQUEST });
    postToResetPassword(inputData)
      .then((res) => {
        if (res.success) {
          dispatch({
            type: RESET_PASSWORD_SUCCESS,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: AUTH_FAILURE,
          payload: err,
        });
      });
  };
};

//добавить добавление токенов

export const loginAction = (inputData) => {
  return function (dispatch) {
    dispatch({ type: AUTH_REQUEST });
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
          type: AUTH_FAILURE,
          payload: err.message,
        });
      });
  };
};

export const logOutAction = () => {
  return function (dispatch) {
    dispatch({ type: AUTH_REQUEST });
    logOut()
      .then((res) => {
        if (res.success) {
          dispatch({ type: LOGOUT_SUCCESS, payload: null });
        }
      })
      .catch((err) => {
        dispatch({
          type: AUTH_FAILURE,
          payload: err.message,
        });
      });
  };
};

export const changeUserDataAction = (data) => {
  return function (dispatch) {
    dispatch({ type: AUTH_REQUEST });
    changeUserData(data)
      .then((res) => {
        console.log("in changeUserDataAction");
        if (res.success) {
          dispatch({ type: CHANGE_USER_DATA_SUCCESS, payload: res.user });
        }
      })
      .catch((err) => {
        console.log("error in catch changeUserDataAction");
        dispatch({
          type: AUTH_FAILURE,
          payload: err.message,
        });
      });
  };
};
