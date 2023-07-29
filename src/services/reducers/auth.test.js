import {
  authCheckAction,
  authFailureAction,
  authRequestAction,
  changeUserAction,
  getUserSuccessAction,
  loginSuccessAction,
  logOutSuccessAction,
  postCodeToResetPasswordAction,
  registrationSuccessAction,
  resetPasswordSuccessAction,
} from "../actions/auth";
import { authReducer, initialState } from "./auth";

const mockRegistrationSuccessResponce = {
  success: true,
  user: { email: "romanosov@mail.ru", name: "eee" },
  accessToken:
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YzRlNTZiODJlMjc3MDAxYmZhNTI0YiIsImlhdCI6MTY5MDYyNTM4NywiZXhwIjoxNjkwNjI2NTg3fQ.GpE9Ese5cEAVwVnNRo4fLx8l0BaIfBX24HVcf9QlzVg",
  refreshToken:
    "f77eaa9fc3d58c354769714aba82e28ee0cc9a98021d7c16ab2fcfc0e28e69ec7ba32790a7d1ebef",
};

const mockGetUserResponce = {
  success: true,
  user: { email: "romanosov@mail.ru", name: "eee" },
};

const mockLoginSuccessResponce = {
  success: true,
  accessToken:
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0M2RhYWZhNDVjNmYyMDAxYmU2YWUzZCIsImlhdCI6MTY5MDYyNzI5MywiZXhwIjoxNjkwNjI4NDkzfQ.dMw0lMwcAnRxCjGYB2tWx2otzLFvTmc7L4c9gCb4nEk",
  refreshToken:
    "51329852a3df745ffa4e38ebd39825f92608edb6a40a8278c43e99aaba3fae73b51d5b3a554f22b2",
  user: {
    email: "romanosow@mail.ru",
    name: "ssssdcdcdcdcdcdcdcdллллллллллeded",
  },
};

const mockChangeUserResponce = {
  success: true,
  user: { email: "romanosow@mail.ru", name: "ssss" },
};

const mockErrorFailure = { name: "string", message: "string" };

describe("test for reducer of auth", () => {
  test("Action AUTH_REQUEST", () => {
    const expected = { ...initialState, isAuthRequest: true };
    const received = authReducer(initialState, authRequestAction());
    expect(received).toEqual(expected);
  });

  test("Action AUTH_CHECK", () => {
    const expected = {
      ...initialState,
      isAuthRequest: false,
      isAuthChecked: true,
    };
    const received = authReducer(initialState, authCheckAction());
    expect(received).toEqual(expected);
  });
  test("Action REGISTRATION_SUCCESS", () => {
    const expected = {
      ...initialState,
      isAuthRequest: false,
      isAuthChecked: true,
      user: mockRegistrationSuccessResponce.user,
      error: null,
    };
    const received = authReducer(
      initialState,
      registrationSuccessAction(mockRegistrationSuccessResponce)
    );
    expect(received).toEqual(expected);
  });
  test("Action RESET_PASSWORD_SUCCESS", () => {
    const expected = {
      ...initialState,
      isAuthChecked: true,
      isAuthRequest: false,
      error: null,
    };
    const received = authReducer(initialState, resetPasswordSuccessAction());
    expect(received).toEqual(expected);
  });
  test("Action CODE_TO_RESET_SUCCESS", () => {
    const expected = {
      ...initialState,
      isAuthRequest: false,
      isAuthChecked: true,
      error: null,
    };
    const received = authReducer(initialState, postCodeToResetPasswordAction());
    expect(received).toEqual(expected);
  });
  test("Action GET_USER_SUCCESS", () => {
    const expected = {
      ...initialState,
      isAuthChecked: true,
      isAuthRequest: false,
      user: mockGetUserResponce.user,
      error: null,
    };
    const received = authReducer(
      initialState,
      getUserSuccessAction(mockGetUserResponce)
    );
    expect(received).toEqual(expected);
  });
  test("Action LOGIN_SUCCESS", () => {
    const expected = {
      ...initialState,
      isAuthChecked: true,
      isAuthRequest: false,
      user: mockLoginSuccessResponce.user,
      error: null,
    };
    const received = authReducer(
      initialState,
      loginSuccessAction(mockLoginSuccessResponce)
    );
    expect(received).toEqual(expected);
  });
  test("Action LOGOUT_SUCCESS", () => {
    const expected = {
      ...initialState,
      isAuthRequest: false,
      user: null,
      error: null,
    };
    const received = authReducer(initialState, logOutSuccessAction());
    expect(received).toEqual(expected);
  });
  test("Action CHANGE_USER_DATA_SUCCESS", () => {
    const expected = {
      ...initialState,
      isAuthRequest: false,
      user: mockChangeUserResponce.user,
      error: null,
    };
    const received = authReducer(
      initialState,
      changeUserAction(mockChangeUserResponce)
    );
    expect(received).toEqual(expected);
  });
  test("Action AUTH_FAILURE", () => {
    const expected = {
      ...initialState,
      isAuthRequest: false,
      error: mockErrorFailure.message,
    };
    const received = authReducer(
      initialState,
      authFailureAction(mockErrorFailure)
    );
    expect(received).toEqual(expected);
  });
});
