import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store";
import CustomRouter from "./components/CustomRouter";
import history from "./components/CustomRouter/history";


ReactDOM.render(
  <Provider store={store}>
      <CustomRouter history={history}>
          <App />
      </CustomRouter>
  </Provider>,
  document.getElementById("root")
);
