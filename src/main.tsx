import React from "react";
import ReactDOM from "react-dom/client";
import "./metrics";
import "./tailwind.css";
import App from "./jagerhof/JagerhofApp";
import { BrowserRouter } from "react-router";
import "./tidescape/styles.css";
import "./tidescape/interactions.css";
import "./glass-map.css";
import "./react-bits-motion.css";
import "./bend/styles.css";
import "./bend/motion.css";
import "./jagerhof/styles.css";
import "./jagerhof/experiences-carousel.css";
import "./jagerhof/arrival-hero.css";
import "./jagerhof/polish.css";
import "./jagerhof/signature.css";
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
