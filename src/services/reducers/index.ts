import { combineReducers } from "redux";
import { burgerIngredientsReducer } from "./burgerIngredients";
import { constructorModal } from "./constructorModal";
import { constructorReducer } from "./burgerConstructor";
import { totalPriceReducer } from "./totalPrice";
import { authReducer } from "./auth";
import { RootState } from "../../types";

export const rootReducer = combineReducers({
  ingredientsData: burgerIngredientsReducer,
  constructorData: constructorReducer,
  constructorModal: constructorModal,
  totalPrice: totalPriceReducer,
  auth: authReducer,
});
