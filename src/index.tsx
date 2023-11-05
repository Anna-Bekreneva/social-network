import React from "react";

import "./index.css";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "@ant-design/cssinjs";

import { App } from "app";
import { store } from "store";
import { ConfigProvider } from "antd";

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#ffa216",
          },
        }}>
        <App />
      </ConfigProvider>
    </Provider>
  </BrowserRouter>,
  document.getElementById("root"),
);
