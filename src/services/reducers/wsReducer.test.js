import { mockSocketMiddlewareResponce } from "../../utils/const";
import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
} from "../actions/wsAction";
import { initialState, wsReducer } from "./wsReducer";

describe("test of reducer wsReducer", () => {
  test("action WS_CONNECTION_SUCCESS", () => {
    const expected = {
      ...initialState,
      wsConnected: true,
      error: null,
    };
    const received = wsReducer(initialState, { type: WS_CONNECTION_SUCCESS });
    expect(received).toEqual(expected);
  });
  test("action WS_CONNECTION_ERROR", () => {
    const expected = {
      ...initialState,
      error: "test",
      wsConnected: false,
    };
    const received = wsReducer(initialState, {
      type: WS_CONNECTION_ERROR,
      payload: "test",
    });
    expect(received).toEqual(expected);
  });
  test("action WS_CONNECTION_CLOSED", () => {
    const expected = {
      ...initialState,
      error: null,
      wsConnected: false,
    };
    const received = wsReducer(initialState, {
      type: WS_CONNECTION_CLOSED,
    });
    expect(received).toEqual(expected);
  });
  test("action WS_GET_MESSAGE", () => {
    const expected = {
      ...initialState,
      error: null,
      orders: [...mockSocketMiddlewareResponce.orders],
      total: mockSocketMiddlewareResponce.total,
      totalToday: mockSocketMiddlewareResponce.totalToday,
    };
    const received = wsReducer(initialState, {
      type: WS_GET_MESSAGE,
      payload: mockSocketMiddlewareResponce,
    });
    expect(received).toEqual(expected);
  });
});
