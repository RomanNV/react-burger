import {
  CODE_TO_RESET_REQUEST,
  CODE_TO_RESET_SUCCESS,
  CODE_TO_RESET_FAILURE,
  REGISTRATION_SUCCESS,
  REGISTRATION_REQUEST,
  REGISTRATION_FAILURE,
  RESET_PASSWORD_FAILURE,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_REQUEST,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  GET_USER_FAILURE,
  GET_USER_SUCCESS,
  GET_USER_REQUEST,
  AUTH_CHECK,
  LOGOUT_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  CHANGE_USER_DATA_REQUEST,
  CHANGE_USER_DATA_SUCCESS,
  CHANGE_USER_DATA_FAILURE,
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
    case REGISTRATION_REQUEST: {
      return {
        ...state,
        isAuthRequest: true,
      };
    }
    case REGISTRATION_SUCCESS: {
      console.log(action.payload);
      return {
        ...state,
        isAuthRequest: false,
        isAuthChecked: true,
        user: action.payload,
      };
    }
    case REGISTRATION_FAILURE: {
      return {
        ...state,
        isAuthRequest: false,
        error: action.payload,
      };
    }
    case RESET_PASSWORD_REQUEST: {
      return {
        ...state,
        isAuthRequest: true,
      };
    }
    case RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        isAuthChecked: true,
        isAuthRequest: false,
        isResetPassword: action.payload,
      };
    }
    case RESET_PASSWORD_FAILURE: {
      return {
        ...state,
        isAuthRequest: false,
        error: action.payload,
      };
    }
    case CODE_TO_RESET_REQUEST: {
      return { ...state, isAuthRequest: true };
    }
    case CODE_TO_RESET_SUCCESS: {
      return {
        ...state,
        isAuthRequest: false,
        isAuthChecked: true,
      };
    }
    case CODE_TO_RESET_FAILURE: {
      return {
        ...state,
        isAuthRequest: false,
        error: action.payload,
      };
    }
    case GET_USER_REQUEST: {
      return { ...state, isAuthRequest: true };
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        isAuthChecked: true,
        isAuthRequest: false,
        user: action.payload,
      };
    }
    case GET_USER_FAILURE: {
      return {
        ...state,
        isAuthRequest: false,
        error: action.payload,
      };
    }
    case LOGIN_REQUEST: {
      return {
        ...state,
        isAuthRequest: true,
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
    case LOGIN_FAILURE: {
      return {
        ...state,
        isAuthRequest: false,
        error: action.payload,
      };
    }
    case LOGOUT_REQUEST: {
      console.log(action.type);
      return { ...state, isAuthRequest: true };
    }
    case LOGOUT_SUCCESS: {
      console.log(action.payload);
      return {
        ...state,
        isAuthRequest: false,
        user: null,
      };
    }
    case LOGOUT_FAILURE: {
      return {
        ...state,
        isAuthRequest: false,
        error: action.payload,
      };
    }

    case CHANGE_USER_DATA_REQUEST: {
      return { ...state, isAuthRequest: true };
    }
    case CHANGE_USER_DATA_SUCCESS: {
      return { ...state, isAuthRequest: false, user: action.payload };
    }
    case CHANGE_USER_DATA_FAILURE: {
      return { ...state, isAuthRequest: false, error: action.payload };
    }
    default: {
      return state;
    }
  }
};
