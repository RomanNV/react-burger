import { addSyntheticTrailingComment } from "typescript";
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
} from "../actions/wsAction";
export interface InitWs {
  wsConnected: boolean;
  orders: any;
  total: null | number;
  totalToday: null | number;
  error: null;
}
const initialState = {
  wsConnected: false,
  orders: [],
  total: null,
  totalToday: null,
  error: null,
};

export const wsReducer = (state: InitWs = initialState, action: any) => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true,
        error: null,
      };

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        error: action.payload,
        wsConnected: false,
      };

    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        error: null,
        wsConnected: false,
      };

    case WS_GET_MESSAGE:
      return {
        ...state,
        error: null,
        orders: [...action.payload.orders],
        total: action.payload.total,
        totalToday: action.payload.totalToday,
      };

    default:
      return state;
  }
};
