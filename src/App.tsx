import React from "react";
import "./App.css";
import DialogDemo from "./DialogDemo";
import FormTest from "./FormTest";
import ResponsiveDatePickers from "./ResponsiveDatePickers";

export default function App() {
  return (
    <div className="App">
      <ResponsiveDatePickers />

      <br />
      <FormTest />

      <br />
      <DialogDemo />
    </div>
  );
}
