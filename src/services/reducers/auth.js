import {
  CODE_TO_RESET_SUCCESS,
  REGISTRATION_SUCCESS,
  RESET_PASSWORD_SUCCESS,
  LOGIN_SUCCESS,
  GET_USER_SUCCESS,
  AUTH_CHECK,
  LOGOUT_SUCCESS,
  CHANGE_USER_DATA_SUCCESS,
  AUTH_FAILURE,
  AUTH_REQUEST,
} from "../actions/auth";

const initialState = {
  isAuthChecked: false,
  isAuthRequest: false,
  error: null,
  user: null,
  isResetPassword: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_REQUEST: {
      return {
        ...state,
        isAuthRequest: true,
      };
    }
    case AUTH_CHECK: {
      return { ...state, isAuthRequest: false, isAuthChecked: true };
    }
    case REGISTRATION_SUCCESS: {
      return {
        ...state,
        isAuthRequest: false,
        isAuthChecked: true,
        user: action.payload,
      };
    }
    case RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        isAuthChecked: true,
        isAuthRequest: false,
      };
    }
    case CODE_TO_RESET_SUCCESS: {
      return {
        ...state,
        isAuthRequest: false,
        isAuthChecked: true,
        isResetPassword: action.payload,
      };
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        isAuthChecked: true,
        isAuthRequest: false,
        user: action.payload,
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        isAuthChecked: true,
        isAuthRequest: false,
        user: action.payload,
      };
    }
    case LOGOUT_SUCCESS: {
      console.log("LOGOUT_SUCCESS");
      return {
        ...state,
        isAuthRequest: false,
        user: null,
      };
    }
    case CHANGE_USER_DATA_SUCCESS: {
      return { ...state, isAuthRequest: false, user: action.payload };
    }
    case AUTH_FAILURE: {
      return { ...state, isAuthRequest: false, error: action.payload };
    }
    default: {
      return state;
    }
  }
};
