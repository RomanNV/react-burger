import { IngredientCard, IngredientCardWithId } from "../../types/commonTypes";

export const DELETE_CONSTRUCTOR_INGREDIENT: "DELETE_CONSTRUCTOR_INGREDIENT" =
  "DELETE_CONSTRUCTOR_INGREDIENT";
export const ADD_BUN: "ADD_BUN" = "ADD_BUN";
export const ADD_INGREDIENT: "ADD_INGREDIENT" = "ADD_INGREDIENT";
export const REORDER_INGREDIENT_LIST: "REORDER_INGREDIENT_LIST" =
  "REORDER_INGREDIENT_LIST";
export const CLEAR_CONSTRUCTOR: "CLEAR_CONSTRUCTOR" = "CLEAR_CONSTRUCTOR";

export interface ClearConstructor {
  type: typeof CLEAR_CONSTRUCTOR;
}

export interface DeleteConstructorIngredient {
  type: typeof DELETE_CONSTRUCTOR_INGREDIENT;
  readonly ingredients: IngredientCardWithId[];
}

export interface AddBun {
  type: typeof ADD_BUN;
  readonly bun: { ingredient: IngredientCard };
}

export interface AddIngredient {
  type: typeof ADD_INGREDIENT;
  ingredients: IngredientCardWithId;
}
export interface ReorderIngredientList {
  type: typeof REORDER_INGREDIENT_LIST;
  splisedList: IngredientCardWithId[];
}
export function reorderIngredientList(
  list: IngredientCardWithId[]
): ReorderIngredientList {
  return { type: REORDER_INGREDIENT_LIST, splisedList: list };
}

export const getIngredientWithId = (
  ingredient: IngredientCard
): IngredientCardWithId => {
  return { ingredient, itemId: Math.random() };
};

export function addIngredientAction(ingredient: IngredientCard): AddIngredient {
  return { type: ADD_INGREDIENT, ingredients: getIngredientWithId(ingredient) };
}

export function addBunAction(ingredient: IngredientCard): AddBun {
  return { type: ADD_BUN, bun: { ingredient } };
}

export function clearConstructorAction(): ClearConstructor {
  return { type: CLEAR_CONSTRUCTOR };
}

export function deleteConstructorIngredientAction(
  ingredient: IngredientCardWithId[]
): DeleteConstructorIngredient {
  return { type: DELETE_CONSTRUCTOR_INGREDIENT, ingredients: ingredient };
}

export type burgerConstructorActions =
  | ClearConstructor
  | AddBun
  | AddIngredient
  | ReorderIngredientList
  | DeleteConstructorIngredient;
