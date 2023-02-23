import { setCookie } from "../../cookie/cookie";
import {
  postToResetPassword,
  login,
  registerNewUser,
  postEmailToGetCode,
} from "../../utils/funcs";

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
    dispatch(REGISTRATION_REQUEST);
    registerNewUser(inputData)
      .then((res) => {
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
            payload: res,
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
        console.log(res);
        if (res.success) {
          dispatch({
            type: LOGIN_SUCCESS,
            payload: res.user,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: LOGIN_FAILURE,
          payload: err,
        });
      });
  };
};
