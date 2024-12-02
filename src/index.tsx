/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthUserProvider } from "./auth/AuthUserProvider";


  const rootElement = document.getElementById("root");

  if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <BrowserRouter>
        <AuthUserProvider>
          <App />
          </AuthUserProvider>
        </BrowserRouter>
      </React.StrictMode>
    );
  }

