import React from "react"; import ReactDOM from "react-dom/client"; import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"; import "./index.css"; import App from "./App"; import LiveMap from "./pages/LiveMap"; import Performance from "./pages/Performance";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode><BrowserRouter><Routes><Route element={<App />}><Route index element={<Navigate to="/live" replace />} /><Route path="/live" element={<LiveMap />} /><Route path="/performance" element={<Performance />} /></Route></Routes></BrowserRouter></React.StrictMode>
);
