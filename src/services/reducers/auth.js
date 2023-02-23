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
} from "../actions/auth";

const initialState = {
  isAuthChecked: false,
  isAuthRequest: false,
  error: null,
  user: null,
};

export const forgotPasswordReducer = (state = initialState, action) => {
  switch (action.type) {
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
    default: {
      return state;
    }
  }
};

export const registrationNewUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTRATION_REQUEST: {
      return {
        ...state,
        isAuthRequest: false,
      };
    }
    case REGISTRATION_SUCCESS: {
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
    default: {
      return state;
    }
  }
};

export const resetPasswordReducer = (state = initialState, action) => {
  switch (action.type) {
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
      };
    }
    case RESET_PASSWORD_FAILURE: {
      return {
        ...state,
        isAuthRequest: false,
        error: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
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
    default: {
      return state;
    }
  }
};
