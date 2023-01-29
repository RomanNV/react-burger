import { combineReducers } from "redux";
import { burgerIngredientsReducer } from "./burgerIngredients";
import { ingredientModal } from "./ingredientsModal";
import { constructorModal } from "./constructorModal";
import { constructorReducer } from "./burgerConstructor";

export const rootReducer = combineReducers({
  ingredientsData: burgerIngredientsReducer,
  ingredientModal: ingredientModal,
  constructorData: constructorReducer,
  constructorModal: constructorModal,
});
