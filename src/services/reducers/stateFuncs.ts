import { Root } from "react-dom/client";
import { RootState } from "../../types/index";

const getIngredientsFromState = (state: RootState) => state.ingredientsData;
const getConstructorData = (state: RootState) => state.constructorData;
const getConstructorModal = (state: RootState) => state.constructorModal;
const getIngredientsDataFromState = (state: RootState) => state.ingredientsData;
const authState = (state: RootState) => state.auth;
const totalPriceState = (state: RootState) => state.totalPrice;
const ingredientsDataState = (state: RootState) => state.ingredientsData;
const getOrder = (state: RootState) => state.order;
const getDataOrders = (state: RootState) => state.orderData;
const getWs = (state: RootState) => state.ws;
export {
  getIngredientsFromState,
  getConstructorData,
  getConstructorModal,
  getIngredientsDataFromState,
  authState,
  totalPriceState,
  ingredientsDataState,
  getOrder,
  getDataOrders,
  getWs,
};
