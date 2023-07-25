import { IngredientCard, IngredientCardWithId } from "../../types/commonTypes";
import {
  DELETE_CONSTRUCTOR_INGREDIENT,
  ADD_BUN,
  ADD_INGREDIENT,
  REORDER_INGREDIENT_LIST,
  CLEAR_CONSTRUCTOR,
  burgerConstructorActions,
} from "../actions/burgerConstructor";

export interface InitStateBurgerConstructor {
  ingredients: Array<IngredientCardWithId>;
  bun: Array<IngredientCardWithId>;
}
export const initialState: InitStateBurgerConstructor = {
  ingredients: [],
  bun: [],
};

export const constructorReducer = (
  state = initialState,
  action: burgerConstructorActions
): InitStateBurgerConstructor => {
  switch (action.type) {
    case ADD_BUN: {
      return {
        ...state,
        bun: [action.ingredient],
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
