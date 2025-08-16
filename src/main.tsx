import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import "./index.module.scss";
import App from "./App.tsx";
import { store } from "./stores/store.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* Provide the Redux Store to React */}
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
