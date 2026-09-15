import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "@google/model-viewer"; // add this line
import '@google/model-viewer';
// unga existing imports (React, App, etc.) idhukku keezha continue pannunga

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);