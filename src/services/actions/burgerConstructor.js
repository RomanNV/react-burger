export const DELETE_CONSTRUCTOR_INGREDIENT = "DELETE_CONSTRUCTOR_INGREDIENT";
export const GET_TOTAL_PRICE = "GET_TOTAL_PRICE";
export const ADD_BUN = "ADD_BUN";
export const ADD_INGREDIENT = "ADD_INGREDIENT";

export const getIngredientWithId = (ingredient) => {
  return { ingredient, itemId: Math.random() };
};
