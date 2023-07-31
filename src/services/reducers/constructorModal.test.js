import {
  openConstructorModalAction,
  closeConstructorModalAction,
} from "../actions/constructorModal";
import { constructorModal, initialState } from "./constructorModal";

describe("test of reducer constructalModal", () => {
  test("action OPEN_CONSTRUCTOR_MODAL", () => {
    const expected = { ...initialState, isOpenConstructorModal: true };
    const received = constructorModal(
      initialState,
      openConstructorModalAction()
    );
    expect(received).toEqual(expected);
  });
  test("action return InitialState", () => {
    const expected = { ...initialState };
    const received = constructorModal(undefined, {});
    expect(received).toEqual(expected);
  });
  test("action CLOSE_CONSTRUCTOR_MODAL", () => {
    const expected = { ...initialState, isOpenConstructorModal: false };
    const received = constructorModal(
      initialState,
      closeConstructorModalAction()
    );
    expect(received).toEqual(expected);
  });
});
