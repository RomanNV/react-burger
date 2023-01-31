import { getDataOrder } from "../../utils/funcs";

export const GET_ORDER_FAILED = "GET_ORDER_FAILED";
export const GET_ORDER_REQUEST = "GET_ORDER_REQUEST";
export const GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS";
export const GET_CONSTRUCTOR_DATA = "GET_CONSTRUCTOR_DATA";
export const GET_ORDER_ID_LIST = "GET_ORDER_ID_LIST";
export const DELETE_CONSTRUCTOR_INGREDIENT = "DELETE_CONSTRUCTOR_INGREDIENT";
export const GET_TOTAL_PRICE = "GET_TOTAL_PRICE";

export const getOrderNum = (arr) => {
  return function (dispatch) {
    dispatch({ type: GET_ORDER_REQUEST });
    getDataOrder(arr)
      .then((res) => {
        if (!res.ok) {
          console.log(res);
          dispatch({ type: GET_ORDER_FAILED, error: "Ишибка сервера!" });
        }
        return res.json();
      })
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
