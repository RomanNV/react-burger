import { Middleware, MiddlewareAPI } from "redux";

export const socketMiddleware = (wsUrl, wsActions) => {
  return (store) => {
    let socket;

    return (next) => (action) => {
      const { dispatch, getState } = store;
      const { type, payload } = action;
      const { wsInit, wsClose, onOpen, onClose, onError, onMessage } =
        wsActions;
      console.log(wsClose);
      //   const { user } = getState().user;
      if (type === wsInit) {
        // объект класса WebSocket
        console.log(`${wsUrl}${payload}`);
        socket = new WebSocket(`${wsUrl}${payload}`);
        socket.onopen = (event) => {
          dispatch({ type: onOpen, payload: event });
        };
        socket.onerror = (event) => {
          dispatch({ type: onError, payload: event });
        };
        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          dispatch({
            type: onMessage,
            payload: parsedData,
          });
        };

        socket.onclose = (event) => {
          dispatch({ type: onClose, payload: event });
        };
      }
      if (wsClose && type === wsClose && socket) {
        socket.close();
      }

      next(action);
    };
  };
};
