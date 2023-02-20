import { combineReducers } from "redux";
import { burgerIngredientsReducer } from "./burgerIngredients";
import { ingredientModal } from "./ingredientsModal";
import { constructorModal } from "./constructorModal";
import { constructorReducer } from "./burgerConstructor";
import { totalPriceReducer } from "./totalPrice";
import { forgotPasswordReducer } from "./forgotPassword";

export const rootReducer = combineReducers({
  ingredientsData: burgerIngredientsReducer,
  ingredientModal: ingredientModal,
  constructorData: constructorReducer,
  constructorModal: constructorModal,
  totalPrice: totalPriceReducer,
  forgotPassword: forgotPasswordReducer,
});
