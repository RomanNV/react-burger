import {
  GET_ORDER_REQUEST,
  GET_ORDER_FAILED,
  GET_ORDER_SUCCESS,
  GET_ORDER_ID_LIST,
  DELETE_CONSTRUCTOR_INGREDIENT,
  GET_CONSTRUCTOR_DATA,
  GET_TOTAL_PRICE,
} from "../actions/burgerConstructor";

const initialState = {
  constructorData: { ingredients: [], bun: [] },
  orderData: "",
  isOrderDataRequest: false,
  error: "",
  totalPrice: 0,
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
    case GET_CONSTRUCTOR_DATA: {
      return {
        ...state,
        constructorData: {
          ...state.constructorData,
          ingredients: action.ingredients,
          bun: action.bun,
        },
      };
    }
    case DELETE_CONSTRUCTOR_INGREDIENT: {
      return {
        ...state,
        constructorData: {
          ...state.constructorData,
          ingredients: action.ingredients,
        },
      };
    }
    case GET_TOTAL_PRICE: {
      return {
        ...state,
        totalPrice: action.totalPrice,
      };
    }

    default:
      return state;
  }
};
