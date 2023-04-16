import { IngredientCard, IngredientCardWithId } from "../../types/commonTypes";

export const DELETE_CONSTRUCTOR_INGREDIENT: "DELETE_CONSTRUCTOR_INGREDIENT" =
  "DELETE_CONSTRUCTOR_INGREDIENT";
export const GET_TOTAL_PRICE: "GET_TOTAL_PRICE" = "GET_TOTAL_PRICE";
export const ADD_BUN: "ADD_BUN" = "ADD_BUN";
export const ADD_INGREDIENT: "ADD_INGREDIENT" = "ADD_INGREDIENT";
export const REORDER_INGREDIENT_LIST: "REORDER_INGREDIENT_LIST" =
  "REORDER_INGREDIENT_LIST";
export const CLEAR_CONSTRUCTOR: "CLEAR_CONSTRUCTOR" = "CLEAR_CONSTRUCTOR";

export const getIngredientWithId = (
  ingredient: IngredientCard
): IngredientCardWithId => {
  return { ingredient, itemId: Math.random() };
};
export type burgerConstructorActions =
  | typeof CLEAR_CONSTRUCTOR
  | typeof REORDER_INGREDIENT_LIST
  | typeof ADD_INGREDIENT
  | typeof ADD_BUN
  | typeof GET_TOTAL_PRICE
  | typeof DELETE_CONSTRUCTOR_INGREDIENT;
