import { AppDispatch, AppThunk } from "../../types";
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

export type BurgerIngredientsActions =
  | GetIngredientRequest
  | GetIngredientFailed
  | GetIngredientSuccess
  | GetViewItem;

export function getViewItemAction(ingredient: IngredientCard): GetViewItem {
  return { type: GET_VIEW_ITEM, viewItem: ingredient };
}

export function getIngredientRequestAction(): GetIngredientRequest {
  return { type: GET_INGREDIENTS_REQUEST };
}
export function getIngredientFailedAction(err: Error): GetIngredientFailed {
  return {
    type: GET_INGREDIENTS_FAILED,
    error: `Ошибка сервера, попробуйте еще ${err.message}`,
  };
}
export function getIngredientSuccessAction(
  responceData: getIngredients
): GetIngredientSuccess {
  return {
    type: GET_INGREDIENTS_SUCCESS,
    ingredients: responceData.data,
  };
}

export const getIngredientsData: AppThunk = () => {
  return function (dispatch: AppDispatch) {
    dispatch(getIngredientRequestAction());
    getDataIng()
      .then((responceData) => {
        dispatch(getIngredientSuccessAction(responceData));
      })
      .catch((err) => {
        dispatch(getIngredientFailedAction(err));
      });
  };
};
