import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "../src/components/App/App";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./services/store";

// declare const window: any;

// const composeEnhancers =
//   typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//     ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
//     : compose;

// const enhancer = composeEnhancers(applyMiddleware(thunk));
// // export const store = configureStore({
// //   reducer: rootReducer,
// // });
// export const store = createStore(rootReducer, enhancer);zz

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
