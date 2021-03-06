import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "@reduxs/store";
import "./index.css";
import "@assets/less/reset.css";
import "@assets/less/border.less";
import '@assets/iconfont/iconfont.css'
import App from "@baseUI/App/AppContainer";
import * as serviceWorker from "./serviceWorker";
import "@assets/GlobalStyle.js";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
