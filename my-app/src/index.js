import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./Store";
import { SnackbarProvider } from "notistack";

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <SnackbarProvider maxSnack={3}>
        <App />
      </SnackbarProvider>
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();
