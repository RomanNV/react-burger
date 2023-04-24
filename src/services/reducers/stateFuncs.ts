import { store } from "../..";
import { RootState } from "../../types/index";

const getIngredientsFromState = (state: RootState) => state.ingredientsData;
const getConstructorData = (state: RootState) => state.constructorData;
const getConstructorModal = (state: RootState) => state.constructorModal;
const getIngredientsDataFromState = (state: RootState) => state.ingredientsData;
const authState = (state: RootState) => state.auth;
const totalPriceState = (state: RootState) => state.totalPrice;
const ingredientsDataState = (state: RootState) => state.ingredientsData;
export {
  getIngredientsFromState,
  getConstructorData,
  getConstructorModal,
  getIngredientsDataFromState,
  authState,
  totalPriceState,
  ingredientsDataState,
};
