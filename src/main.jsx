import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";
import "./layout.css";
import App from "./App.jsx";
import { LibraryProvider } from "./store/LibraryContext";
import { NoticeProvider } from './store/NoticeContext'

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <LibraryProvider>
        <NoticeProvider>
          <App />
        </NoticeProvider>
      </LibraryProvider>
    </BrowserRouter>
  </StrictMode>,
);
