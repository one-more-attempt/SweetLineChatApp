import React from "react";
import ReactDOM from "react-dom/client";
import "./AppStyles.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AuthContextProvider } from "./context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContextProvider>
    <App />
  </AuthContextProvider>
);
reportWebVitals();
