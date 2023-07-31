import { initialState, orderReducer } from "./order";
import { getOrderItem } from "../actions/order";
import { mockOrderItem } from "../../utils/const";

describe("orderreducer test", () => {
  test("orderItem should be returned", () => {
    const expected = { ...initialState, orderItem: mockOrderItem };
    const received = orderReducer(initialState, getOrderItem(mockOrderItem));
    expect(received).toEqual(expected);
  });
  test("action return InitialState", () => {
    const expected = { ...initialState };
    const received = orderReducer(undefined, {});
    expect(received).toEqual(expected);
  });
});
