import { getCookie } from "../../cookie/cookie";

export const WS_CONNECTION_START = "WS_CONNECTION_START";
export const WS_CONNECTION_SUCCESS = "WS_CONNECTION_SUCCESS";
export const WS_CONNECTION_ERROR = "WS_CONNECTION_ERROR";
export const WS_CONNECTION_CLOSE = "WS_CONNECTION_CLOSE";
export const WS_CONNECTION_CLOSED = "WS_CONNECTION_CLOSED";
export const WS_GET_MESSAGE = "WS_GET_MESSAGE";
// export const WS_SEND_MESSAGE = "WS_SEND_MESSAGE";
export const startWsAction = () => {
  return { type: WS_CONNECTION_START, payload: "orders/all" };
};

export const startWsProtectedWsAction = () => {
  const accessToken = getCookie("accessToken").trim();
  return {
    type: WS_CONNECTION_START,
    payload: `orders?token=${accessToken}`,
  };
};
export const disconnectWsAction = () => ({
  type: WS_CONNECTION_CLOSE,
});
