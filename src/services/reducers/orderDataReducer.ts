import {
  GET_ORDER_DATA_FAILED,
  GET_ORDER_DATA_REQUEST,
  GET_ORDER_DATA_SUCCESS,
} from "../actions/getOrderData";
export interface InitStateOrderData {
  orderData: any;
  isLoadingOneData: boolean;
  error: string;
}
export const initialState = {
  orderData: {},
  isLoadingOneData: true,
  error: "",
};

export const orderDataRed = (
  state = initialState,
  action: any
): InitStateOrderData => {
  switch (action.type) {
    case GET_ORDER_DATA_REQUEST: {
      return { ...state };
    }
    case GET_ORDER_DATA_SUCCESS: {
      return {
        ...state,
        orderData: action.payload,
        isLoadingOneData: false,
        error: "",
      };
    }

    case GET_ORDER_DATA_FAILED: {
      return { ...state, error: action.payload, isLoadingOneData: false };
    }
    default:
      return state;
  }
};
