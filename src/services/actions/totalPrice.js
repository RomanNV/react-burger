import { getDataOrder } from "../../utils/funcs";
export const GET_ORDER_FAILED = "GET_ORDER_FAILED";
export const GET_ORDER_REQUEST = "GET_ORDER_REQUEST";
export const GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS";
export const NOT_BUN = "NOT_BUN";

export const getOrderNum = (arr) => {
  return function (dispatch) {
    if (arr.length === 0) {
      dispatch({ type: NOT_BUN, payload: "В бургере не может не быть булок" });
      return;
    }
    dispatch({ type: GET_ORDER_REQUEST });
    getDataOrder(arr)
      .then((responceData) => {
        dispatch({
          type: GET_ORDER_SUCCESS,
          orderData: responceData.order.number,
        });
      })
      .catch((err) => {
        dispatch({ type: GET_ORDER_FAILED, error: err.message });
      });
  };
};
