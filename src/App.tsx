import React from "react";
import "./App.css";
import DialogDemo from "./DialogDemo";
import FormTest from "./FormTest";
import ResponsiveDatePickers from "./date-pickers/ResponsiveDatePickers";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import { Home } from "./Home";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="date-pickers" element={<ResponsiveDatePickers />} />
          <Route path="dialog-demo" element={<DialogDemo />} />
          <Route path="form-demo" element={<FormTest />} />
        </Route>
      </Routes>
    </div>
  );
}
