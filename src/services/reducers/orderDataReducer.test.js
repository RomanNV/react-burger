import {
  getOrderDataFailedAction,
  getOrderDataRequestAction,
  getOrderSuccessAction,
} from "../actions/getOrderData";
import { initialState, orderDataRed } from "./orderDataReducer";

const mockOrderData = {
  success: true,
  orders: [
    {
      _id: "64c2b7db82e277001bfa4b04",
      ingredients: [
        "643d69a5c3f7b9001cfa093d",
        "643d69a5c3f7b9001cfa0949",
        "643d69a5c3f7b9001cfa0949",
        "643d69a5c3f7b9001cfa0949",
        "643d69a5c3f7b9001cfa094a",
        "643d69a5c3f7b9001cfa094a",
      ],
      owner: "64c0079b82e277001bfa3e9c",
      status: "done",
      name: "Астероидный флюоресцентный экзо-плантаго бургер",
      createdAt: "2023-07-27T18:30:51.177Z",
      updatedAt: "2023-07-27T18:30:51.373Z",
      number: 14738,
      __v: 0,
    },
  ],
};
describe("test for reducer of get OrderData", () => {
  test("Action GET_ORDER_DATA_REQUEST", () => {
    const expected = { ...initialState };
    const received = orderDataRed(initialState, getOrderDataRequestAction());
    expect(received).toEqual(expected);
  });
  test("Action GET_ORDER_DATA_FAILED", () => {
    const expected = {
      ...initialState,
      error: `Ошибка сервера, попробуйте еще раз`,
      isLoadingOneData: false,
    };
    const received = orderDataRed(
      initialState,
      getOrderDataFailedAction({ message: "раз" })
    );
    expect(received).toEqual(expected);
  });
  test("Action GET_ORDER_DATA_SUCCESS", () => {
    const expected = {
      ...initialState,
      error: "",
      orderData: mockOrderData,
      isLoadingOneData: false,
    };
    const received = orderDataRed(
      initialState,
      getOrderSuccessAction(mockOrderData)
    );
    expect(received).toEqual(expected);
  });
});
