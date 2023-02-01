import {
  GET_ORDER_REQUEST,
  GET_ORDER_FAILED,
  GET_ORDER_SUCCESS,
  DELETE_CONSTRUCTOR_INGREDIENT,
  GET_TOTAL_PRICE,
  ADD_BUN,
  ADD_INGREDIENT,
} from "../actions/burgerConstructor";

const initialState = {
  ingredients: [],
  bun: [],
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
    case ADD_BUN: {
      return {
        ...state,
        bun: [action.bun],
      };
    }
    case ADD_INGREDIENT: {
      return {
        ...state,
        ingredients: [...state.ingredients, action.ingredients],
      };
    }

    case DELETE_CONSTRUCTOR_INGREDIENT: {
      return {
        ...state,

        ingredients: action.ingredients,
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
