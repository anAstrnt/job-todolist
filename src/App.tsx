import React, { useState } from "react";
import "./App.css";
import TitleAddBar from "./components/TitleAddBar";
import { Routes, Route } from "react-router-dom";
import { TodoPages } from "./components/TodoPages";

const App: React.FC = () => {
  const [links, setLinks] = useState("");

  const setIsLinks = (link: string) => {
    setLinks(link);
  };

  return (
    <div className="App">
      <TitleAddBar setIsLinks={setIsLinks} />
      <Routes>
        <Route path={links} element={<TodoPages />} />
      </Routes>
    </div>
  );
};

export default App;
