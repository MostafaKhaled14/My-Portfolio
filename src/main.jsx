import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./index.css";
import App from "./App.jsx";
import MyContextProvider from "./context/MyContext.jsx";

createRoot(document.getElementById("root")).render(
  <MyContextProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </MyContextProvider>
);
