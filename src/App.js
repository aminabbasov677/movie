
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import MainContent from "./MainContent";
import './App.css';

function App() {
  return (
    <Router>
      <MainContent />
    </Router>
  );
}

export default App;
