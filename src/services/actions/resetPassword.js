import { postToResetPassword } from "../../utils/funcs";
export const GET_REQUEST_TO_RESET_PASSWORD_REQUEST =
  "GET_REQUEST_TO_RESET_PASSWORD_REQUEST";
export const GET_REQUEST_TO_RESET_PASSWORD_SUCCESS =
  "GET_REQUEST_TO_RESET_PASSWORD_SUCCESS";
export const GET_REQUEST_TO_RESET_PASSWORD_FAILURE =
  "GET_REQUEST_TO_RESET_PASSWORD_FAILURE";

export const getRequestToResetPassword = (inputData) => {
  console.log(inputData);
  return function (dispatch) {
    dispatch({ type: GET_REQUEST_TO_RESET_PASSWORD_REQUEST });
    postToResetPassword(inputData)
      .then((res) => {
        console.log(res);
        if (res.success) {
          dispatch({ type: GET_REQUEST_TO_RESET_PASSWORD_SUCCESS });
        }
      })
      .catch((err) => {
        dispatch({
          type: GET_REQUEST_TO_RESET_PASSWORD_FAILURE,
          payload: err,
        });
      });
  };
};
