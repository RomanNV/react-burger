import {
  OPEN_INGREDIENT_MODAL,
  CLOSE_INGREDIENT_MODAL,
} from "../actions/ingredientModal";

const initialState = {
  isOpenIngredientModal: false,
};

export const ingredientModal = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_INGREDIENT_MODAL: {
      return { ...state, isOpenIngredientModal: true };
    }
    case CLOSE_INGREDIENT_MODAL: {
      return { ...state, isOpenIngredientModal: false };
    }
    default:
      return state;
  }
};
