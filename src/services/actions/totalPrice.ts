import { getDataOrder } from "../../utils/funcs";
import { CLEAR_CONSTRUCTOR } from "./burgerConstructor";
export const GET_ORDER_FAILED: "GET_ORDER_FAILED" = "GET_ORDER_FAILED";
export const GET_ORDER_REQUEST: "GET_ORDER_REQUEST" = "GET_ORDER_REQUEST";
export const GET_ORDER_SUCCESS: "GET_ORDER_SUCCESS" = "GET_ORDER_SUCCESS";
export const NOT_BUN: "NOT_BUN" = "NOT_BUN";

export const getOrderNum = (arr: string[]) => {
  return function (dispatch: any) {
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
        dispatch({ type: CLEAR_CONSTRUCTOR });
      })
      .catch((err) => {
        dispatch({ type: GET_ORDER_FAILED, payload: err.message });
      });
  };
};
