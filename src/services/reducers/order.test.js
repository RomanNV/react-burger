import { initialState, orderReducer } from "./order";
import React from "react";
import { getOrderItem } from "../actions/order";
const mockOrderItem = {
  _id: "643dab1745c6f2001be6ae3f",
  ingredients: ["643d69a5c3f7b9001cfa0943", "643d69a5c3f7b9001cfa093d"],
  status: "done",
  name: "Space флюоресцентный бургер",
  createdAt: "2023-04-17T20:24:55.860Z",
  updatedAt: "2023-04-17T20:24:55.950Z",
  number: 507,
};
it("orderItem should be returned ", () => {
  const expected = { ...initialState, orderItem: mockOrderItem };
  const received = orderReducer(initialState, getOrderItem(mockOrderItem));
  expect(received).toEqual(expected);
});
