import { getChoosenOrder } from "../../utils/funcs";

export const GET_ORDER_DATA_SUCCESS = "GET_ORDER_DATA_SUCCESS";
export const GET_ORDER_DATA_REQUEST = "GET_ORDER_DATA_REQUEST";
export const GET_ORDER_DATA_FAILED = "GET_ORDER_DATA_FAILED";

export function getOrderSuccessAction(responceData) {
  return {
    type: GET_ORDER_DATA_SUCCESS,
    payload: responceData,
  };
}
export function getOrderRequestAction() {
  return { type: GET_ORDER_DATA_REQUEST };
}
export function getIngredientFailedAction(err) {
  return {
    type: GET_ORDER_DATA_FAILED,
    payload: `Ошибка сервера, попробуйте еще ${err.message}`,
  };
}
export const getOrderData = (number) => {
  return function (dispatch) {
    dispatch(getOrderRequestAction());
    getChoosenOrder(number)
      .then((responceData) => {
        dispatch(getOrderSuccessAction(responceData));
      })
      .catch((err) => {
        dispatch(getIngredientFailedAction(err));
      });
  };
};
