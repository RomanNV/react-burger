import {
  GET_REQUEST_TO_RESET_PASSWORD_FAILURE,
  GET_REQUEST_TO_RESET_PASSWORD_REQUEST,
  GET_REQUEST_TO_RESET_PASSWORD_SUCCESS,
} from "../actions/resetPassword";

const initialState = {
  isGetRequestToResetPasswordRequest: false,
  isGetRequestToResetPassword: false,
  error: "",
};

export const resetPasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_REQUEST_TO_RESET_PASSWORD_REQUEST: {
      return { ...state, isGetRequestToResetPasswordRequest: true };
    }
    case GET_REQUEST_TO_RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        isGetRequestToResetPasswordRequest: false,
        isGetRequestToResetPassword: true,
      };
    }
    case GET_REQUEST_TO_RESET_PASSWORD_FAILURE: {
      return {
        ...state,
        isGetRequestToResetPasswordRequest: false,
        error: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
