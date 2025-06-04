import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "flowbite"; // pastikan sudah di-import jika menggunakan plugin flowbite

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
