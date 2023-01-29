import {
  GET_ORDER_REQUEST,
  GET_ORDER_FAILED,
  GET_ORDER_SUCCESS,
  GET_DATA_INGREDIENTS,
  GET_BUN_DATA,
  GET_ORDER_ID_LIST,
} from "../actions/burgerConstructor";

const initialState = {
  dataFilteredIngredients: [],
  bunData: {},
  orderData: "",
  isOrderDataRequest: false,
  error: "",
  listIdOrder: [],
};

export const constructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDER_REQUEST: {
      return { ...state, isOrderDataRequest: true };
    }
    case GET_ORDER_FAILED: {
      return { ...state, isOrderDataRequest: false, error: action.error };
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        isOrderDataRequest: false,
        orderData: action.orderData,
      };
    }
    case GET_DATA_INGREDIENTS: {
      return {
        ...state,
        dataFilteredIngredients: action.dataFilteredIngredients,
      };
    }
    case GET_BUN_DATA: {
      return {
        ...state,
        bunData: action.bunData,
      };
    }
    case GET_ORDER_ID_LIST: {
      return {
        ...state,
        listIdOrder: action.listIdOrder,
      };
    }
    default:
      return state;
  }
};
