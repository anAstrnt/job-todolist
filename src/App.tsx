import React, { useState } from "react";
import "./App.css";
import TitleAddBar from "./components/TitleAddBar";
import { todoContext, Todos } from "./context/Todos";

// interface TODO {
//   id: string;
//   title: string;
//   todo: string;
//   detail: string;
//   status: string;
//   deadline: string;
//   timestamp: string;
// }

const App: React.FC = () => {
  // const [todoIds, setTodoIds] = useState<string>("");
  // const [jobTitles, setJobTitles] = useState<string>("");
  // const [todo, setTodo] = useState<string>("");
  // const [todoDetail, setTodoDetail] = useState<string>("");
  // const [todoStatus, setTodoStatus] = useState<string>("");
  // const [todoDeadline, setTodoDeadline] = useState<string>("");
  // const [todoTimestamp, setTodoTimestamp] = useState<string>("");
  // const [todos, setTodo] = [
  //   {
  //     todoIds: todoIds,
  //     jobTitles: jobTitles,
  //     todo: todo,
  //     todoDetail: todoDetail,
  //     todoStatus: todoStatus,
  //     todoDeadline: todoDeadline,
  //     todoTimestamp: todoTimestamp,
  //   },
  // ];
  const ctx = Todos();

  return (
    <div className="App">
      <todoContext.Provider value={ctx}>
        <TitleAddBar />
      </todoContext.Provider>
    </div>
  );
};

export default App;
