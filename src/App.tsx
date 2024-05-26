import React, { useContext } from "react";
import "./App.css";
import TitleAddBar from "./components/TitleAddBar";
import { todoContext, TodosProvider } from "./context/Todos";
import { Routes, Route } from "react-router-dom";
import { TodoPages } from "./components/TodoPages";

const App: React.FC = () => {
  const ctx = TodosProvider();

  return (
    <div className="App">
      <todoContext.Provider value={ctx}>
        <TitleAddBar />
        <Routes>
          <Route path={ctx.links} element={<TodoPages />} />
        </Routes>
      </todoContext.Provider>
    </div>
  );
};

export default App;
