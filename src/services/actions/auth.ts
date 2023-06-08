import { AnyAction } from "redux";
import { setCookie, getCookie } from "../../cookie/cookie";
import { AppDispatch, AppThunk, TApplicationActions } from "../../types";
import {
  InitialInputProfile,
  InitialInputRegister,
  InitialInputReset,
  InitialLoginPage,
  User,
  UserAuth,
} from "../../types/commonTypes";
import {
  postToResetPassword,
  login,
  registerNewUser,
  postEmailToGetCode,
  getUser,
  logOut,
  changeUserData,
} from "../../utils/funcs";
import { clearConstructorAction } from "./burgerConstructor";
export const GET_USER_SUCCESS: "GET_USER_SUCCESS" = "GET_USER_SUCCESS";
export const AUTH_CHECK: "AUTH_CHECK" = "AUTH_CHECK";
export const AUTH_REQUEST: "AUTH_REQUEST" = "AUTH_REQUEST";
export const CHANGE_USER_DATA_SUCCESS: "CHANGE_USER_DATA_SUCCESS" =
  "CHANGE_USER_DATA_SUCCESS";
export const CODE_TO_RESET_SUCCESS: "CODE_TO_RESET_SUCCESS" =
  "CODE_TO_RESET_SUCCESS";
export const AUTH_FAILURE: "AUTH_FAILURE" = "AUTH_FAILURE";
export const REGISTRATION_SUCCESS: "REGISTRATION_SUCCESS" =
  "REGISTRATION_SUCCESS";
export const RESET_PASSWORD_SUCCESS: "RESET_PASSWORD_SUCCESS" =
  "RESET_PASSWORD_SUCCESS";
export const LOGIN_SUCCESS: "LOGIN_SUCCESS" = "LOGIN_SUCCESS";
export const LOGOUT_SUCCESS: "LOGOUT_SUCCESS" = "LOGOUT_SUCCESS";

export interface AuthUser {
  payload: User;
}
export interface AuthRequest {
  type: typeof AUTH_REQUEST;
}
export interface GetUserSuccess extends AuthUser {
  type: typeof GET_USER_SUCCESS;
}
export interface AuthFailure {
  type: typeof AUTH_FAILURE;
  payload: string;
}
export interface AuthCheck {
  type: typeof AUTH_CHECK;
}
export interface CodeToResetSuccess {
  type: typeof CODE_TO_RESET_SUCCESS;
}
export interface RegistrationSuccess extends AuthUser {
  type: typeof REGISTRATION_SUCCESS;
}
export interface ResetPasswordSuccess {
  type: typeof RESET_PASSWORD_SUCCESS;
}

export interface LoginSuccess extends AuthUser {
  type: typeof LOGIN_SUCCESS;
}
export interface ChangeUserDataSuccess extends AuthUser {
  type: typeof CHANGE_USER_DATA_SUCCESS;
}
export interface LogOutSuccess {
  type: typeof LOGOUT_SUCCESS;
}
export type AuthActions =
  | LogOutSuccess
  | ChangeUserDataSuccess
  | LoginSuccess
  | ResetPasswordSuccess
  | RegistrationSuccess
  | CodeToResetSuccess
  | AuthCheck
  | AuthFailure
  | GetUserSuccess
  | AuthRequest;

export function changeUserAction(
  res: UserAuth["getUser"]
): ChangeUserDataSuccess {
  return { type: CHANGE_USER_DATA_SUCCESS, payload: res.user };
}
export function authFailureAction(err: Error): AuthFailure {
  return { type: AUTH_FAILURE, payload: err.message };
}
export function loginSuccessAction(
  responce: UserAuth["getUser"]
): LoginSuccess {
  return { type: LOGIN_SUCCESS, payload: responce.user };
}
export function resetPasswordSuccessAction(): ResetPasswordSuccess {
  return { type: RESET_PASSWORD_SUCCESS };
}
export function registrationSuccessAction(
  responce: UserAuth["getUser"]
): RegistrationSuccess {
  return { type: REGISTRATION_SUCCESS, payload: responce.user };
}
export function postCodeToResetPasswordAction(): CodeToResetSuccess {
  return {
    type: CODE_TO_RESET_SUCCESS,
  };
}
export function authRequestAction(): AuthRequest {
  return { type: AUTH_REQUEST };
}

export function logOutSuccessAction(): LogOutSuccess {
  return { type: LOGOUT_SUCCESS };
}

export function authCheckAction(): AuthCheck {
  return { type: AUTH_CHECK };
}
export function getUserSuccessAction(res: UserAuth["getUser"]): GetUserSuccess {
  return { type: GET_USER_SUCCESS, payload: res.user };
}
//проверка токеа на валидность реализована в функции fetchWithRefresh в funcs
export const checkUserAuth: AppThunk = () => {
  return function (dispatch: AppDispatch) {
    console.log("in checkuser");

    if (getCookie("accessToken")) {
      dispatch(authRequestAction());
      getUser()
        .then((res) => {
          dispatch(getUserSuccessAction(res));
        })
        .catch((err) => {
          dispatch(authFailureAction(err));
        })
        .finally(() => dispatch(authCheckAction()));
    } else {
      dispatch(authCheckAction());
    }
  };
};

export const getCodeToResetPassword: AppThunk = (
  email: string,
  callback: Function
) => {
  return function (dispatch: AppDispatch) {
    dispatch(authRequestAction());
    postEmailToGetCode(email)
      .then(() => {
        dispatch(postCodeToResetPasswordAction());
        callback();
      })
      .catch((err) => {
        dispatch(authFailureAction(err));
      });
  };
};

export const registerNewUserAction: AppThunk = (
  inputData: InitialInputRegister
) => {
  return function (dispatch: AppDispatch) {
    dispatch(authRequestAction());
    registerNewUser(inputData)
      .then((res) => {
        localStorage.setItem("refreshToken", res.refreshToken);
        setCookie("accessToken", res.accessToken.split("Bearer")[1], {});
        dispatch(registrationSuccessAction(res));
      })
      .catch((err) => {
        dispatch(authFailureAction(err));
      });
  };
};

export const getRequestToResetPassword: AppThunk = (
  inputData: InitialInputReset,
  callback: Function
) => {
  return function (dispatch: AppDispatch) {
    dispatch(authRequestAction());
    postToResetPassword(inputData)
      .then(() => {
        dispatch(resetPasswordSuccessAction());
        callback();
      })
      .catch((err) => {
        dispatch(authFailureAction(err));
      });
  };
};

export const loginAction: AppThunk = (inputData: InitialLoginPage) => {
  return function (dispatch: AppDispatch) {
    dispatch(authRequestAction());
    login(inputData)
      .then((res) => {
        localStorage.setItem("refreshToken", res.refreshToken);
        setCookie("accessToken", res.accessToken.split("Bearer")[1], {});
        dispatch(loginSuccessAction(res));
      })
      .catch((err) => {
        dispatch(authFailureAction(err));
      });
  };
};

export const logOutAction: AppThunk = () => {
  return function (dispatch: AppDispatch) {
    dispatch(authRequestAction());
    logOut()
      .then(() => {
        dispatch(logOutSuccessAction());
        dispatch(clearConstructorAction());
      })
      .catch((err) => {
        dispatch(authFailureAction(err));
      });
  };
};

export const changeUserDataAction: any | AppThunk = (
  data: InitialInputProfile
) => {
  return function (dispatch: AppDispatch) {
    dispatch(authRequestAction());
    changeUserData(data)
      .then((res) => {
        dispatch(changeUserAction(res));
      })
      .catch((err) => {
        dispatch(authFailureAction(err));
      });
  };
};
