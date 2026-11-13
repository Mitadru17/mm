import React from "react";
import ReactDOM from "react-dom/client";
import "./metrics";
import App from "./tidescape/TideApp";
import { BrowserRouter } from "react-router";
import "@fontsource/oranienbaum/latin-400.css";
import "@fontsource/inter/latin-400.css";
import "@fontsource/inter/latin-500.css";
import "@fontsource/inter/latin-600.css";
import "./tidescape/styles.css";
import { MotionRoot } from "./motion";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MotionRoot>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MotionRoot>
  </React.StrictMode>,
);
