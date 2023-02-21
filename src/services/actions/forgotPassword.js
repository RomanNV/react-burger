import { postEmailToGetCode } from "../../utils/funcs";
export const GET_CODE_TO_RESET_REQUEST = "GET_CODE_TO_RESET_REQUEST";
export const GET_CODE_TO_RESET_SUCCESS = "GET_CODE_TO_RESET_SUCCESS";
export const GET_CODE_TO_RESET_FAILURE = "GET_CODE_TO_RESET_FAILURE";

export const getCodeToResetPassword = (email) => {
  return function (dispatch) {
    dispatch({ type: GET_CODE_TO_RESET_REQUEST });
    postEmailToGetCode(email)
      .then((res) => {
        if (res.success) {
          dispatch({ type: GET_CODE_TO_RESET_SUCCESS });
        }
      })
      .catch((err) => {
        dispatch({
          type: GET_CODE_TO_RESET_FAILURE,
          payload: err,
        });
      });
  };
};
