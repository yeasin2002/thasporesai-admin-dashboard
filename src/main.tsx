import App from "@/App";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { Provider } from "react-redux";
import { persistore, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "./components/ui/sonner";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistore}>
        <App />
        <Toaster position="top-center" richColors />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);
