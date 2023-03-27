import React from "react";
import ReactDOM from "react-dom";
import MainContextProvider from "./contexts/MainContext.js";
import { StylesProvider } from "@material-ui/core/styles";

import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <StylesProvider injectFirst>
      <MainContextProvider>
        <App />
      </MainContextProvider>
    </StylesProvider>
  </React.StrictMode>,
  rootElement
);
