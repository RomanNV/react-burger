import {
  mockIngredients,
  mockErrorFailure,
  mockViewItemIngredient,
} from "../../utils/const";
import {
  getIngredientRequestAction,
  getIngredientFailedAction,
  getViewItemAction,
  getIngredientSuccessAction,
} from "../actions/burgerIngredients";
import { burgerIngredientsReducer, initialState } from "./burgerIngredients";

describe("Test of reducer burgerIngredients", () => {
  test("action GET_INGREDIENTS_REQUEST", () => {
    const expected = { ...initialState, isDataIngredientsRequest: true };
    const received = burgerIngredientsReducer(
      initialState,
      getIngredientRequestAction()
    );
    expect(received).toEqual(expected);
  });
  test("action return InitialState", () => {
    const expected = { ...initialState };
    const received = burgerIngredientsReducer(undefined, {});
    expect(received).toEqual(expected);
  });
  test("action GET_INGREDIENTS_FAILED", () => {
    const expected = {
      ...initialState,
      dataIngredients: [],
      isDataIngredientsRequest: false,
      error: `Ошибка сервера, попробуйте еще ${mockErrorFailure.message}`,
    };
    const received = burgerIngredientsReducer(
      initialState,
      getIngredientFailedAction(mockErrorFailure)
    );
    expect(received).toEqual(expected);
  });
  test("action GET_VIEW_ITEM", () => {
    const expected = {
      ...initialState,
      viewItem: mockViewItemIngredient,
    };
    const received = burgerIngredientsReducer(
      initialState,
      getViewItemAction(mockViewItemIngredient)
    );
    expect(received).toEqual(expected);
  });
  test("action GET_INGREDIENTS_SUCCESS", () => {
    const expected = {
      ...initialState,
      dataIngredients: [...mockIngredients.data],
      isDataIngredientsRequest: false,
    };
    const received = burgerIngredientsReducer(
      initialState,
      getIngredientSuccessAction(mockIngredients)
    );
    expect(received).toEqual(expected);
  });
});
