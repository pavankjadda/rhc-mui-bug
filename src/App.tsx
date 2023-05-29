import React from "react";
import "./App.css";
import DialogDemo from "./date-pickers/DialogDemo";
import FormTest from "./forms/FormTest";
import ResponsiveDatePickers from "./date-pickers/ResponsiveDatePickers";
import { Route, Routes } from "react-router-dom";
import { Home } from "./Home";
import ZodFormTest from "./forms/ZodFormTest";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="date-pickers" element={<ResponsiveDatePickers />} />
          <Route path="dialog-demo" element={<DialogDemo />} />
          <Route path="form-demo" element={<FormTest />} />
          <Route path="zod-form-demo" element={<ZodFormTest />} />
        </Route>
      </Routes>
    </div>
  );
}
