import { combineReducers } from "redux";
import { burgerIngredientsReducer } from "./burgerIngredients";
import { constructorModal } from "./constructorModal";
import { constructorReducer } from "./burgerConstructor";
import { totalPriceReducer } from "./totalPrice";
import { authReducer } from "./auth";
import { orderReducer } from "./order";
import { orderDataRed } from "./orderDataReducer";
import { wsReducer } from "./wsReducer";

export const rootReducer = combineReducers({
  ingredientsData: burgerIngredientsReducer,
  constructorData: constructorReducer,
  constructorModal: constructorModal,
  totalPrice: totalPriceReducer,
  auth: authReducer,
  order: orderReducer,
  orderData: orderDataRed,
  ws: wsReducer,
});
