import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import styles from "./TodoPages.module.css";
import AddBoxIcon from "@mui/icons-material/AddBox";
import AlarmIcon from "@mui/icons-material/Alarm";
import AlarmOffIcon from "@mui/icons-material/AlarmOff";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import TodoStateSection from "./TodoStateSection";
import { SelectChangeEvent } from "@mui/material";

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
  const [editableTodo, setEditableTodo] = useState(false);
  const [inputNewTodo, setInputNewTodo] = useState("");
  const [inputNewStatus, setInputNewStatus] = useState("");
  const [inputNewDeadline, setInputNewDeadline] = useState("");
  const [inputNewDetail, setInputNewDetail] = useState("");
  const [todoItems, setTodoItems] = useState<todoItems>([]);
  const [dialogOpen, setDialogOpen] = useState(false);

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

  const handleDeleteTodo = (id: string) => {
    const newTodos = todoItems.filter((todo) => todo.id !== id);
    setTodoItems(newTodos);
  };

  const inputTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputNewTodo(e.target.value);
  };
  const inputDeadline = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputNewDeadline(e.target.value);
  };

  const editableTodoOpen = () => {
    setEditableTodo(!editableTodo);
  };

  const updateTodos = (
    id: string,
    inputNewTodo: string,
    newStatus: string,
    deadline: string,
    detail: string
  ) => {
    setTodoItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? {
              ...item,
              todo: inputNewTodo,
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

  const updateTodoStatusInDialog = (e: SelectChangeEvent) => {
    setInputNewStatus(e.target.value);
  };
  const updateTodoDetailInDialog = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputNewDetail(e.target.value);
  };

  const isLocationPathname = !location.pathname.substring(1).trim();

  const inProgressTodos = todoItems.filter((todo) => todo.status === "inProgress");
  const notStartedTodos = todoItems.filter((todo) => todo.status === "notStarted");
  const completedTodos = todoItems.filter((todo) => todo.status === "completed");

  const dialogHandleOpen = () => {
    setDialogOpen(true);
  };
  const dialogHandleClose = () => {
    setDialogOpen(false);
  };

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
          inputTodo={inputTodo}
          inputNewTodo={inputNewTodo}
          inputNewDeadline={inputNewDeadline}
          editableTodo={editableTodo}
          inputDeadline={inputDeadline}
          editableTodoOpen={editableTodoOpen}
          updateTodos={updateTodos}
          updateStatus={updateTodoStatus}
          updateTodoStatusInDialog={updateTodoStatusInDialog}
          updateTodoDetailInDialog={updateTodoDetailInDialog}
          inputNewStatus={inputNewStatus}
          inputNewDetail={inputNewDetail}
          dialogHandleOpen={dialogHandleOpen}
          dialogHandleClose={dialogHandleClose}
          dialogOpen={dialogOpen}
        />
        <TodoStateSection
          title="Not Started"
          icon={<AlarmOffIcon />}
          handleDeleteTodo={handleDeleteTodo}
          statusFilter={notStartedTodos}
          inputTodo={inputTodo}
          inputNewTodo={inputNewTodo}
          inputNewDeadline={inputNewDeadline}
          inputDeadline={inputDeadline}
          editableTodo={editableTodo}
          editableTodoOpen={editableTodoOpen}
          updateTodos={updateTodos}
          updateStatus={updateTodoStatus}
          updateTodoStatusInDialog={updateTodoStatusInDialog}
          updateTodoDetailInDialog={updateTodoDetailInDialog}
          inputNewStatus={inputNewStatus}
          inputNewDetail={inputNewDetail}
          dialogHandleOpen={dialogHandleOpen}
          dialogHandleClose={dialogHandleClose}
          dialogOpen={dialogOpen}
        />
        <TodoStateSection
          title="Completed"
          icon={<CheckCircleIcon />}
          handleDeleteTodo={handleDeleteTodo}
          statusFilter={completedTodos}
          inputTodo={inputTodo}
          inputNewTodo={inputNewTodo}
          inputNewDeadline={inputNewDeadline}
          inputDeadline={inputDeadline}
          editableTodo={editableTodo}
          editableTodoOpen={editableTodoOpen}
          updateTodos={updateTodos}
          updateStatus={updateTodoStatus}
          updateTodoStatusInDialog={updateTodoStatusInDialog}
          updateTodoDetailInDialog={updateTodoDetailInDialog}
          inputNewStatus={inputNewStatus}
          inputNewDetail={inputNewDetail}
          dialogHandleOpen={dialogHandleOpen}
          dialogHandleClose={dialogHandleClose}
          dialogOpen={dialogOpen}
        />
      </div>
    </div>
  );
};
