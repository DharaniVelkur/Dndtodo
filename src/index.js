import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import NoteState from "./components/context/NoteState";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <NoteState>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </NoteState>
);
