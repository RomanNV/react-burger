import {
  TypedUseSelectorHook,
  useSelector as selectorHook,
  useDispatch as dispatchHook,
} from "react-redux";
import store from "../services/store";
import { AppDispatch, AppThunk, RootState } from "../types/index";

export type DispatchFunc = () => AppDispatch;

export const useDispatch: DispatchFunc = dispatchHook;
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
// export const useDispatch = () => dispatchHook<AppDispatch | AppThunk>();
