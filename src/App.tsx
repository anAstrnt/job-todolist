import React from "react";
import "./App.css";
import TitleAddBar from "./components/TitleAddBar";

interface TODO {
  id: string;
  title: string;
  todo: string;
  detail: string;
  status: string;
  deadline: string;
  timestamp: string;
}

const App = () => {
  return (
    <div className="App">
      <TitleAddBar />
    </div>
  );
};

export default App;
