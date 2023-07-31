import { TwsActions } from "../store";

export const socketMiddleware = (wsUrl: string, wsActions: TwsActions) => {
  return (store: any) => {
    let socket: null | WebSocket = null;

    return (next: any) => (action: any) => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { wsInit, wsClose, onOpen, onClose, onError, onMessage } =
        wsActions;
      if (type === wsInit) {
        // объект класса WebSocket
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
