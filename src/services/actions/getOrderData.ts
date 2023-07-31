import { AppDispatch, AppThunk } from "../../types";
import { GetOrderData } from "../../types/commonTypes";
import { getChoosenOrder } from "../../utils/funcs";

export const GET_ORDER_DATA_SUCCESS: "GET_ORDER_DATA_SUCCESS" =
  "GET_ORDER_DATA_SUCCESS";
export const GET_ORDER_DATA_REQUEST: "GET_ORDER_DATA_REQUEST" =
  "GET_ORDER_DATA_REQUEST";
export const GET_ORDER_DATA_FAILED: "GET_ORDER_DATA_FAILED" =
  "GET_ORDER_DATA_FAILED";
export type orderDataActions =
  | getOrderSuccess
  | getOrderRequest
  | getOrderFailed;
export interface getOrderSuccess {
  type: typeof GET_ORDER_DATA_SUCCESS;
  payload: GetOrderData;
}
export interface getOrderRequest {
  type: typeof GET_ORDER_DATA_REQUEST;
}
export interface getOrderFailed {
  type: typeof GET_ORDER_DATA_FAILED;
  payload: string;
}

export function getOrderSuccessAction(
  responceData: GetOrderData
): getOrderSuccess {
  return {
    type: GET_ORDER_DATA_SUCCESS,
    payload: responceData,
  };
}
export function getOrderDataRequestAction(): getOrderRequest {
  return { type: GET_ORDER_DATA_REQUEST };
}
export function getOrderDataFailedAction(err: Error): getOrderFailed {
  return {
    type: GET_ORDER_DATA_FAILED,
    payload: `Ошибка сервера, попробуйте еще ${err.message}`,
  };
}
export const getOrderData: AppThunk = (number: number) => {
  return function (dispatch: AppDispatch) {
    dispatch(getOrderDataRequestAction());
    getChoosenOrder(number)
      .then((responceData) => {
        dispatch(getOrderSuccessAction(responceData));
      })
      .catch((err: Error) => {
        dispatch(getOrderDataFailedAction(err));
      });
  };
};
