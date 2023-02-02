import {
  DELETE_CONSTRUCTOR_INGREDIENT,
  GET_TOTAL_PRICE,
  ADD_BUN,
  ADD_INGREDIENT,
  REORDER_INGREDIENT_LIST,
} from "../actions/burgerConstructor";

const initialState = {
  ingredients: [],
  bun: [],
  totalPrice: 0,
};

export const constructorReducer = (state = initialState, action) => {
  switch (action.type) {
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
    case REORDER_INGREDIENT_LIST: {
      return { ...state, ingredients: action.splisedList };
    }

    default:
      return state;
  }
};
