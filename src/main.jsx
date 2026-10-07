import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";
import "./layout.css";
import App from "./App.jsx";
import { LibraryProvider } from "./store/LibraryContext";
import { NoticeProvider } from './store/NoticeContext'
import { AuthProvider } from './store/AuthContext'

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <LibraryProvider>
          <NoticeProvider>
            <App />
          </NoticeProvider>
        </LibraryProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
