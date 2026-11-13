import React from "react";
import ReactDOM from "react-dom/client";
import "@fontsource/cormorant-garamond/latin-400.css";
import "@fontsource/cormorant-garamond/latin-500.css";
import "@fontsource/cormorant-garamond/latin-400-italic.css";
import "@fontsource/cormorant-garamond/latin-500-italic.css";
import "@fontsource/pinyon-script/latin-400.css";
import "@fontsource/dm-sans/latin-400.css";
import "@fontsource/dm-sans/latin-500.css";
import "@fontsource/dm-sans/latin-600.css";
import "./styles.css";
import "./responsive.css";
import "./cinematic.css";
import "./metrics";
import App from "./App";
import { MotionRoot } from "./motion";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MotionRoot>
      <App />
    </MotionRoot>
  </React.StrictMode>,
);
