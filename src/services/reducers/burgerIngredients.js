import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  GET_VIEW_ITEM,
} from "../actions/burgerIngredients";

const initialState = {
  dataIngredients: [],
  viewItem: {},
  isDataIngredientsRequest: false,
  error: "",
};

export const burgerIngredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return { ...state, isDataIngredientsRequest: true };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        dataIngredients: [...action.ingredients],
        isDataIngredientsRequest: false,
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        dataIngredients: [],
        isDataIngredientsRequest: false,
        error: action.error,
      };
    }
    case GET_VIEW_ITEM: {
      return { ...state, viewItem: action.viewItem };
    }

    default:
      return state;
  }
};
