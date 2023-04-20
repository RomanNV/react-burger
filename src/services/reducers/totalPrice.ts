import {
  NOT_BUN,
  GET_ORDER_SUCCESS,
  GET_ORDER_REQUEST,
  GET_ORDER_FAILED,
  TotalPriceActions,
} from "../actions/totalPrice";

export interface InitStateTotalPrice {
  orderData: number | null;
  isOrderDataRequest: boolean;
  isEmptyOrder: boolean;
  error: string | null;
}
const initialState = {
  orderData: null,
  isOrderDataRequest: false,
  isEmptyOrder: false,
  error: null,
};
export const totalPriceReducer = (
  state = initialState,
  action: TotalPriceActions
): InitStateTotalPrice => {
  switch (action.type) {
    case NOT_BUN: {
      return { ...state, isEmptyOrder: true, error: action.payload };
    }
    case GET_ORDER_REQUEST: {
      return { ...state, isOrderDataRequest: true, isEmptyOrder: false };
    }
    case GET_ORDER_FAILED: {
      return {
        ...state,
        orderData: null,
        isOrderDataRequest: false,
        error: action.payload,
        isEmptyOrder: false,
      };
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        isOrderDataRequest: false,
        orderData: action.orderData,
        isEmptyOrder: false,
        error: null,
      };
    }
    default:
      return state;
  }
};
