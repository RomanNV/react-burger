import {
  mockErrorFailure,
  mockNotBunError,
  mockOrderDataResponce,
} from "../../utils/const";
import {
  notBunAction,
  getOrderRequestAction,
  getOrderFailedAction,
  getOrderSuccessAction,
} from "../actions/totalPrice";
import { initialState, totalPriceReducer } from "./totalPrice";

describe("test of reducer totalPrice", () => {
  test("action CLOSE_CONSTRUCTOR_MODAL", () => {
    const expected = {
      ...initialState,
      isEmptyOrder: true,
      error: mockNotBunError,
    };
    const received = totalPriceReducer(initialState, notBunAction());
    expect(received).toEqual(expected);
  });
  test("action return InitialState", () => {
    const expected = {
      ...initialState,
    };
    const received = totalPriceReducer(undefined, {});
    expect(received).toEqual(expected);
  });
  test("action GET_ORDER_REQUEST", () => {
    const expected = {
      ...initialState,
      isOrderDataRequest: true,
      isEmptyOrder: false,
    };
    const received = totalPriceReducer(initialState, getOrderRequestAction());
    expect(received).toEqual(expected);
  });
  test("action GET_ORDER_FAILED", () => {
    const expected = {
      ...initialState,
      orderData: null,
      isOrderDataRequest: false,
      error: mockErrorFailure.message,
      isEmptyOrder: false,
    };
    const received = totalPriceReducer(
      initialState,
      getOrderFailedAction(mockErrorFailure)
    );
    expect(received).toEqual(expected);
  });
  test("action GET_ORDER_SUCCESS", () => {
    const expected = {
      ...initialState,
      isOrderDataRequest: false,
      orderData: mockOrderDataResponce.order.number,
      isEmptyOrder: false,
      error: null,
    };
    const received = totalPriceReducer(
      initialState,
      getOrderSuccessAction(mockOrderDataResponce)
    );
    expect(received).toEqual(expected);
  });
});
