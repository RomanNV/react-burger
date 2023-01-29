import { getDataOrder } from "../../utils/funcs";

export const GET_ORDER_FAILED = "GET_ORDER_FAILED";
export const GET_ORDER_REQUEST = "GET_ORDER_REQUEST";
export const GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS";
export const GET_CONSTRUCTOR_DATA = "GET_CONSTRUCTOR_DATA";
export const GET_ORDER_ID_LIST = "GET_ORDER_ID_LIST";
export const GET_DATA_INGREDIENTS = "GET_DATA_INGREDIENTS";
export const GET_BUN_DATA = "GET_BUN_DATA";

export const getOrderNum = (arr) => {
  return function (dispatch) {
    dispatch({ type: GET_ORDER_REQUEST });
    getDataOrder(arr)
      .then((res) => {
        if (!res.ok) {
          dispatch({ type: GET_ORDER_FAILED, error: "Ишибка сервера!" });
        }
        return res.json();
      })
      .then((responceData) => {
        dispatch({
          type: GET_ORDER_SUCCESS,
          orderData: responceData.order,
        });
      })
      .catch((err) => {
        dispatch({ type: GET_ORDER_FAILED, error: err.message });
      });
  };
};
