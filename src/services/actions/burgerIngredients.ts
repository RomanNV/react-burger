import { getIngredients, IngredientCard } from "../../types/commonTypes";
import { getDataIng } from "../../utils/funcs";

export const GET_INGREDIENTS_REQUEST: "GET_INGREDIENTS_REQUEST" =
  "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS: "GET_INGREDIENTS_SUCCESS" =
  "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED: "GET_INGREDIENTS_FAILED" =
  "GET_INGREDIENTS_FAILED";
export const GET_VIEW_ITEM: "GET_VIEW_ITEM" = "GET_VIEW_ITEM";

export interface GetIngredientRequest {
  type: typeof GET_INGREDIENTS_REQUEST;
}
export interface GetIngredientFailed {
  type: typeof GET_INGREDIENTS_FAILED;
  error: string;
}
export interface GetIngredientSuccess {
  type: typeof GET_INGREDIENTS_SUCCESS;
  ingredients: IngredientCard[];
}

export interface GetViewItem {
  type: typeof GET_VIEW_ITEM;
  viewItem: IngredientCard;
}
export function getViewItem(ingredient: IngredientCard): GetViewItem {
  return { type: GET_VIEW_ITEM, viewItem: ingredient };
}

export function getIngredientRequest(): GetIngredientRequest {
  return { type: GET_INGREDIENTS_REQUEST };
}
export function getIngredientFailed(err: Error): GetIngredientFailed {
  return {
    type: GET_INGREDIENTS_FAILED,
    error: `Ошибка сервера, попробуйте еще ${err.message}`,
  };
}
export function getIngredientSuccess(
  responceData: getIngredients
): GetIngredientSuccess {
  return {
    type: GET_INGREDIENTS_SUCCESS,
    ingredients: responceData.data,
  };
}

export const getIngredientsData = () => {
  return function (dispatch: any) {
    dispatch(getIngredientRequest());
    getDataIng()
      .then((responceData) => {
        dispatch(getIngredientSuccess(responceData));
      })
      .catch((err) => {
        dispatch(getIngredientFailed(err));
      });
  };
};
export type BurgerIngredientsActions =
  | GetIngredientRequest
  | GetIngredientFailed
  | GetIngredientSuccess
  | GetViewItem;
