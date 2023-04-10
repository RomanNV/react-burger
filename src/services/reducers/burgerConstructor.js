import {
  DELETE_CONSTRUCTOR_INGREDIENT,
  ADD_BUN,
  ADD_INGREDIENT,
  REORDER_INGREDIENT_LIST,
  CLEAR_CONSTRUCTOR,
} from "../actions/burgerConstructor";

const initialState = {
  ingredients: [],
  bun: [],
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

    case REORDER_INGREDIENT_LIST: {
      return { ...state, ingredients: action.splisedList };
    }
    case CLEAR_CONSTRUCTOR: {
      return { ...state, bun: [], ingredients: [] };
    }

    default:
      return state;
  }
};
