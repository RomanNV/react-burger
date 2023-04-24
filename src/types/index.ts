import { Action } from "@remix-run/router";
import { ActionCreator } from "redux";
import { ThunkAction } from "redux-thunk";
import { store } from "..";
import { AuthActions } from "../services/actions/auth";
import { burgerConstructorActions } from "../services/actions/burgerConstructor";
import { BurgerIngredientsActions } from "../services/actions/burgerIngredients";
import { constructorModalActions } from "../services/actions/constructorModal";
import { TotalPriceActions } from "../services/actions/totalPrice";
// import { ThunkAction } from "redux-thunk";
// import { Action, ActionCreator } from "redux";
// import { store } from "..";
// export type RootState = ReturnType<typeof store.getState>;

// export type AppThunk<TReturn = void> = ActionCreator<
//   ThunkAction<TReturn, Action, RootState, TApplicationActions>
// >;

type ApplicationActions =
  | AuthActions
  | burgerConstructorActions
  | BurgerIngredientsActions
  | constructorModalActions
  | TotalPriceActions;

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, ApplicationActions>
>;

export type AppDispatch = typeof store.dispatch;
