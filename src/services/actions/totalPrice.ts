import { AppDispatch, AppThunk } from "../../types";
import { getOrder } from "../../types/commonTypes";
import { getDataOrder } from "../../utils/funcs";
import { clearConstructorAction } from "./burgerConstructor";
export const GET_ORDER_FAILED: "GET_ORDER_FAILED" = "GET_ORDER_FAILED";
export const GET_ORDER_REQUEST: "GET_ORDER_REQUEST" = "GET_ORDER_REQUEST";
export const GET_ORDER_SUCCESS: "GET_ORDER_SUCCESS" = "GET_ORDER_SUCCESS";
export const NOT_BUN: "NOT_BUN" = "NOT_BUN";

export interface GetOrderFailed {
  type: typeof GET_ORDER_FAILED;
  payload: string;
}
export interface GetOrderRequest {
  type: typeof GET_ORDER_REQUEST;
}
export interface GetOrderSuccess {
  type: typeof GET_ORDER_SUCCESS;
  orderData: number;
}
export interface NotBun {
  type: typeof NOT_BUN;
  payload: string;
}
export type TotalPriceActions =
  | NotBun
  | GetOrderSuccess
  | GetOrderRequest
  | GetOrderFailed;

export function getOrderFailedAction(err: Error): GetOrderFailed {
  return { type: GET_ORDER_FAILED, payload: err.message };
}
export function getOrderRequestAction(): GetOrderRequest {
  return { type: GET_ORDER_REQUEST };
}
export function getOrderSuccessAction(responceData: getOrder): GetOrderSuccess {
  return { type: GET_ORDER_SUCCESS, orderData: responceData.order.number };
}
export function notBunAction(): NotBun {
  return { type: NOT_BUN, payload: "В бургере не может не быть булок" };
}

export const getOrderNum: AppThunk = (arr: string[]) => {
  return function (dispatch: AppDispatch) {
    if (arr.length === 0) {
      dispatch(notBunAction());
      return;
    }
    dispatch(getOrderRequestAction());
    getDataOrder(arr)
      .then((responceData) => {
        dispatch(getOrderSuccessAction(responceData));
        dispatch(clearConstructorAction());
      })
      .catch((err) => {
        dispatch(getOrderFailedAction(err));
      });
  };
};
