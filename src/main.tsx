import React from "react";
import ReactDOM from "react-dom/client";
import "./samples/node-api";
import "./index.scss";
import AppContainer from "./AppContainer";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AppContainer />
  </React.StrictMode>
);

postMessage({ payload: "removeLoading" }, "*");
