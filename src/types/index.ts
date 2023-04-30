import { ActionCreator, Action, AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { AuthActions } from "../services/actions/auth";
import { burgerConstructorActions } from "../services/actions/burgerConstructor";
import { BurgerIngredientsActions } from "../services/actions/burgerIngredients";
import { constructorModalActions } from "../services/actions/constructorModal";
import { TotalPriceActions } from "../services/actions/totalPrice";
import { authInitialState } from "../services/reducers/auth";
import { InitStateBurgerConstructor } from "../services/reducers/burgerConstructor";
import { InitialIngredientsState } from "../services/reducers/burgerIngredients";
import { InitStateConstructorModal } from "../services/reducers/constructorModal";
import { InitStateTotalPrice } from "../services/reducers/totalPrice";
import store from "../services/store";
// import { ThunkAction } from "redux-thunk";
// import { Action, ActionCreator } from "redux";
// import { store } from "..";
// export type RootState = ReturnType<typeof store.getState>;

// export type AppThunk<TReturn = void> = ActionCreator<
//   ThunkAction<TReturn, Action, RootState, TApplicationActions>
// >;

export type TApplicationActions =
  | AuthActions
  | burgerConstructorActions
  | BurgerIngredientsActions
  | constructorModalActions
  | TotalPriceActions;

export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, RootState, unknown, TApplicationActions>
>;

export type AppDispatch = typeof store.dispatch;

export type RootState = {
  ingredientsData: InitialIngredientsState;
  constructorData: InitStateBurgerConstructor;
  constructorModal: InitStateConstructorModal;
  totalPrice: InitStateTotalPrice;
  auth: authInitialState;
};
