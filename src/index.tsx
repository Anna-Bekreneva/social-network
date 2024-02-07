import React from "react";

import "./styles/index.scss";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, HashRouter } from "react-router-dom";
import "@ant-design/cssinjs";

import { App } from "app";
import { store } from "store";
import { ConfigProvider } from "antd";

ReactDOM.render(
  <HashRouter>
    <Provider store={store}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#f46119",
            fontSize: 16,
            // fontFamily: 'Inter'
          },
        }}>
        <App />
      </ConfigProvider>
    </Provider>
  </HashRouter>,
  document.getElementById("root"),
);
