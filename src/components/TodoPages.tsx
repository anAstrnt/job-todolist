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
  const [idStock, setIdStock] = useState("");
  const [dayStart, setDayStart] = useState("");
  const [dayEnd, setDayEnd] = useState("");
  const [noDeadline, setNoDeadline] = useState(true);
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
              todo: updateNewTodo || item.todo,
              status: newStatus || item.status,
              deadline: deadline || item.deadline,
              detail: detail || item.detail,
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

  // 検索機能(ID)
  const setId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIdStock(e.target.value);
  };

  const searchId = (todo: {
    id: string;
    links: string;
    titles: string;
    todo: string;
    detail: string;
    status: string;
    deadline: string;
    timestamp: string;
  }) => {
    if (todo.id === idStock) {
      return false;
    } else {
      return true;
    }
  };

  // 検索機能(Deadline)
  const onChangeDayStart = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDayStart(e.target.value);
  };
  const onChangeDayEnd = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDayEnd(e.target.value);
  };

  const deadlineSearch = (todo: {
    id: string;
    links: string;
    titles: string;
    todo: string;
    detail: string;
    status: string;
    deadline: string;
    timestamp: string;
  }) => {
    const startDate = dayStart ? new Date(dayStart).getTime() : null;
    const endDate = dayEnd ? new Date(dayEnd).getTime() : null;
    const todoDate = todo.deadline ? new Date(todo.deadline).getTime() : null;

    if (todoDate === null) {
      return true;
    }

    if (startDate && endDate) {
      return startDate <= todoDate && todoDate <= endDate;
    } else if (startDate) {
      return startDate <= todoDate;
    } else if (endDate) {
      return todoDate <= endDate;
    } else {
      return true;
    }
  };

  const noDeadlineProcess = (todo: {
    id: string;
    links: string;
    titles: string;
    todo: string;
    detail: string;
    status: string;
    deadline: string;
    timestamp: string;
  }) => {
    if (todo.deadline == "") {
      return noDeadline;
    } else {
      return true;
    }
  };

  const inProgressTodos = todoItems.filter(
    (todo) =>
      todo.status === "inProgress" &&
      deadlineSearch(todo) &&
      noDeadlineProcess(todo) &&
      searchId(todo)
  );
  const notStartedTodos = todoItems.filter(
    (todo) =>
      todo.status === "notStarted" &&
      deadlineSearch(todo) &&
      noDeadlineProcess(todo) &&
      searchId(todo)
  );
  const completedTodos = todoItems.filter(
    (todo) =>
      todo.status === "completed" &&
      deadlineSearch(todo) &&
      noDeadlineProcess(todo) &&
      searchId(todo)
  );

  const toggleNoDeadline = () => {
    setNoDeadline(!noDeadline);
  };

  const isLocationPathname = !location.pathname.substring(1).trim();

  return (
    <div className={styles.todoPages}>
      <div className={styles.headline}>
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

        {/* searchAria */}
        <div className={styles.searchAria}>
          <h2>ID Search</h2>
          <input type="text" value={idStock} onChange={(e) => setId(e)} />
          <h2>Deadline Search</h2>
          <p>start</p>
          <input type="date" value={dayStart} onChange={(e) => onChangeDayStart(e)} />
          <p>end</p>
          <input type="date" value={dayEnd} onChange={(e) => onChangeDayEnd(e)} />
          <p>Do you want to display tasks with no deadline?</p>
          <button onClick={toggleNoDeadline}>Button</button>
        </div>
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
