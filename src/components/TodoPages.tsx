import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import styles from "./TodoPages.module.css";
import AddBoxIcon from "@mui/icons-material/AddBox";
import AlarmIcon from "@mui/icons-material/Alarm";
import AlarmOffIcon from "@mui/icons-material/AlarmOff";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import TodoStateSection from "./TodoStateSection";

type todoItems = {
  id: string;
  links: string;
  titles: string;
  todo: string;
  detail: string;
  status: string;
  deadline: string;
  timestamp: string;
}[];

export const TodoPages: React.FC = () => {
  const location = useLocation();
  const [inputNewTodo, setInputNewTodo] = useState("");
  const [todoItems, setTodoItems] = useState<todoItems>([]);

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();

  const addTodos = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTodo = {
      id: uuidv4(),
      links: location.pathname,
      titles: location.pathname.substring(1),
      todo: inputNewTodo,
      detail: "",
      status: "notStarted",
      deadline: "",
      timestamp: `${year}年${month}月${day}日`,
    };
    setTodoItems([newTodo, ...todoItems]);
    setInputNewTodo("");
  };

  const inputTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputNewTodo(e.target.value);
  };

  const handleDeleteTodo = (id: string) => {
    const newTodos = todoItems.filter((todo) => todo.id !== id);
    setTodoItems(newTodos);
  };

  const updateTodos = (
    id: string,
    updateNewTodo: string,
    newStatus: string,
    deadline: string,
    detail: string
  ) => {
    setTodoItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? {
              ...item,
              todo: updateNewTodo,
              status: newStatus,
              deadline: deadline,
              detail: detail,
            }
          : item
      )
    );
  };

  const updateTodoStatus = (id: string, newStatus: string) => {
    setTodoItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
  };

  const isLocationPathname = !location.pathname.substring(1).trim();

  const inProgressTodos = todoItems.filter((todo) => todo.status === "inProgress");
  const notStartedTodos = todoItems.filter((todo) => todo.status === "notStarted");
  const completedTodos = todoItems.filter((todo) => todo.status === "completed");

  return (
    <div className={styles.todoPages}>
      {/* inputTodoAria */}
      <div className={styles.titleName}>
        <p>{location.pathname.substring(1)}</p>
        <form className={styles.addTodoForm} onSubmit={(e) => addTodos(e)}>
          <input
            type="text"
            name="inputTodo"
            placeholder="Add Todo"
            className={styles.inputTodo}
            value={inputNewTodo}
            onChange={(e) => inputTodo(e)}
          />
          <button className={styles.addTodoButton} disabled={isLocationPathname}>
            <AddBoxIcon sx={{ width: "20%", height: "20%" }} />
          </button>
        </form>
      </div>

      {/* TodoAria */}
      <div className={styles.todoStatus}>
        <TodoStateSection
          title="In Progress"
          icon={<AlarmIcon />}
          handleDeleteTodo={handleDeleteTodo}
          statusFilter={inProgressTodos}
          updateTodos={updateTodos}
          updateStatus={updateTodoStatus}
        />
        <TodoStateSection
          title="Not Started"
          icon={<AlarmOffIcon />}
          handleDeleteTodo={handleDeleteTodo}
          statusFilter={notStartedTodos}
          updateTodos={updateTodos}
          updateStatus={updateTodoStatus}
        />
        <TodoStateSection
          title="Completed"
          icon={<CheckCircleIcon />}
          handleDeleteTodo={handleDeleteTodo}
          statusFilter={completedTodos}
          updateTodos={updateTodos}
          updateStatus={updateTodoStatus}
        />
      </div>
    </div>
  );
};
