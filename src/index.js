import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Setting from "./menu/Setting";
import "./fonts/KoreanKRSM.woff";
import { BrowserRouter, Routes, Route } from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="setting" element={<Setting />} />
      <Route
        path="*"
        element={
          <main style={{ padding: "1rem" }}>
            <p>There's nothing here!</p>
          </main>
        }
      />
    </Routes>
  </BrowserRouter>
);