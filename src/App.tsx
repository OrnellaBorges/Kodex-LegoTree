import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Parser from "./Parser";

function App() {
  return (
    <div className="App">
      <header className="header">
        <Parser />
      </header>
    </div>
  );
}

export default App;
