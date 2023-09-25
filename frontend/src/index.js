import React from "react";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import {createRoot} from 'react-dom/client';
import ScrollToTop from "./util/ScrollToTop";
import {AuthProvider} from "./context/AuthProvider";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(
  // <React.StrictMode >
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <ScrollToTop />
        <AuthProvider>
            <App />
        </AuthProvider>
    </BrowserRouter>
  // </React.StrictMode>
);
