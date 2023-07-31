import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import thunk from "redux-thunk";
import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_CLOSE,
  WS_CONNECTION_ERROR,
} from "./actions/wsAction";
import { socketMiddleware } from "./middleWare/socketMiddleware";
import { rootReducer } from "./reducers";
export type TwsActions = {
  wsInit: typeof WS_CONNECTION_START;
  wsClose: typeof WS_CONNECTION_CLOSE;
  onOpen: typeof WS_CONNECTION_SUCCESS;
  onClose: typeof WS_CONNECTION_CLOSED;
  onError: typeof WS_CONNECTION_ERROR;
  onMessage: typeof WS_GET_MESSAGE;
};
const wsActions: TwsActions = {
  wsInit: WS_CONNECTION_START,
  wsClose: WS_CONNECTION_CLOSE,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE,
};
const wsUrl = "wss://norma.nomoreparties.space/";
const middleware = [thunk, socketMiddleware(wsUrl, wsActions)];

const enhancer = composeWithDevTools(applyMiddleware(...middleware));
const store = createStore(rootReducer, enhancer);

export default store;
