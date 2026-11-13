import { createElement } from "react";
import "@google/model-viewer";
import { useSiteMotion } from "./motion";
export default function ModelCanvas() {
  const reduced = useSiteMotion();
  return createElement("model-viewer", {
    src: "/art/mountain-relief.glb",
    poster: "/art/mountain-relief.webp",
    alt: "Original abstract bronze mountain-relief sculpture. Drag to rotate; scroll or pinch to zoom.",
    "camera-controls": true,
    "auto-rotate": reduced ? undefined : "",
    "rotation-per-second": "12deg",
    "shadow-intensity": "0.8",
    "environment-image": "neutral",
    "camera-orbit": "0deg 48deg 12m",
    "camera-target": "0m 0.15m 0m",
    "touch-action": "pan-y",
    "interaction-prompt": "auto",
    style: { width: "100%", height: "min(65svh,600px)", background: "#f4ede3" },
  });
}
