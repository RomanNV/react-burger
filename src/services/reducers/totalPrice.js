import {
  NOT_BUN,
  GET_ORDER_SUCCESS,
  GET_ORDER_REQUEST,
  GET_ORDER_FAILED,
} from "../actions/totalPrice";
const initialState = {
  orderData: "",
  isOrderDataRequest: false,
  isEmptyOrder: false,
  error: "",
};
export const totalPriceReducer = (state = initialState, action) => {
  switch (action.type) {
    case NOT_BUN: {
      return { ...state, isEmptyOrder: true };
    }
    case GET_ORDER_REQUEST: {
      return { ...state, isOrderDataRequest: true, isEmptyOrder: false };
    }
    case GET_ORDER_FAILED: {
      return {
        ...state,
        isOrderDataRequest: false,
        error: action.error,
        isEmptyOrder: false,
      };
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        isOrderDataRequest: false,
        orderData: action.orderData,
        isEmptyOrder: false,
      };
    }
    default:
      return state;
  }
};
