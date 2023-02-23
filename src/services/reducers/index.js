import { combineReducers } from "redux";
import { burgerIngredientsReducer } from "./burgerIngredients";
import { ingredientModal } from "./ingredientsModal";
import { constructorModal } from "./constructorModal";
import { constructorReducer } from "./burgerConstructor";
import { totalPriceReducer } from "./totalPrice";
import {
  resetPasswordReducer,
  registrationNewUserReducer,
  forgotPasswordReducer,
  loginReducer,
} from "./auth";

export const rootReducer = combineReducers({
  ingredientsData: burgerIngredientsReducer,
  ingredientModal: ingredientModal,
  constructorData: constructorReducer,
  constructorModal: constructorModal,
  totalPrice: totalPriceReducer,
  forgotPassword: forgotPasswordReducer,
  resetPassword: resetPasswordReducer,
  registerUser: registrationNewUserReducer,
  login: loginReducer,
});
