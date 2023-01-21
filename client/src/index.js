import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import { UserAuthContextProvider } from "./context/UserAuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <UserAuthContextProvider>
    <App />
  </UserAuthContextProvider>
);
