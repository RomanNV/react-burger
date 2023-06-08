import { getCookie } from "../../cookie/cookie";

export const WS_CONNECTION_START: "WS_CONNECTION_START" = "WS_CONNECTION_START";
export const WS_CONNECTION_SUCCESS: "WS_CONNECTION_SUCCESS" =
  "WS_CONNECTION_SUCCESS";
export const WS_CONNECTION_ERROR: "WS_CONNECTION_ERROR" = "WS_CONNECTION_ERROR";
export const WS_CONNECTION_CLOSE: "WS_CONNECTION_CLOSE" = "WS_CONNECTION_CLOSE";
export const WS_CONNECTION_CLOSED: "WS_CONNECTION_CLOSED" =
  "WS_CONNECTION_CLOSED";
export const WS_GET_MESSAGE: "WS_GET_MESSAGE" = "WS_GET_MESSAGE";

export interface IstartWsAction {
  type: typeof WS_CONNECTION_START;
  payload: string;
}
export interface IstartWsProtectedWsAction {
  type: typeof WS_CONNECTION_START;
  payload: string;
}
export interface IdisconnectWsAction {
  type: typeof WS_CONNECTION_CLOSE;
}
export type wsActionsType =
  | IstartWsAction
  | IstartWsProtectedWsAction
  | IdisconnectWsAction;

export const startWsAction = (): IstartWsAction => {
  return { type: WS_CONNECTION_START, payload: "orders/all" };
};

export const startWsProtectedWsAction = (): IstartWsProtectedWsAction => {
  const accessToken = getCookie("accessToken")?.trim();
  return {
    type: WS_CONNECTION_START,
    payload: `orders?token=${accessToken}`,
  };
};
export const disconnectWsAction = (): IdisconnectWsAction => ({
  type: WS_CONNECTION_CLOSE,
});
