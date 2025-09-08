import { StrictMode } from "react";
import "./index.css";
import App from "./App.jsx";
import { createRoot } from "react-dom/client";
import ContextProvider from "./context/ContextProvider";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ContextProvider>
        <App />
      </ContextProvider>
    </BrowserRouter>
  </StrictMode>
);
