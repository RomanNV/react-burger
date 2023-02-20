import {
  GET_CODE_TO_RESET_REQUEST,
  GET_CODE_TO_RESET_SUCCESS,
  GET_CODE_TO_RESET_FAILURE,
} from "../actions/forgotPassword";

const initialState = {
  isGetCodeToResetPasswordRequest: false,
  isGetCodeToResetPassword: false,
  error: "",
};

export const forgotPasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CODE_TO_RESET_REQUEST: {
      return { ...state, isGetCodeToResetPasswordRequest: true };
    }
    case GET_CODE_TO_RESET_SUCCESS: {
      return {
        ...state,
        isGetCodeToResetPasswordRequest: false,
        isGetCodeToResetPassword: true,
      };
    }
    case GET_CODE_TO_RESET_FAILURE: {
      return {
        ...state,
        isGetCodeToResetPasswordRequest: false,
        error: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
