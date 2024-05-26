import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import styles from "./TodoPages.module.css";
import AddBoxIcon from "@mui/icons-material/AddBox";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import AlarmIcon from "@mui/icons-material/Alarm";
import AlarmOffIcon from "@mui/icons-material/AlarmOff";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Typography from "@mui/material/Typography";

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
  const [todoStatus, setTodoStatus] = useState<string>("notStarted");
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
      status: todoStatus,
      deadline: "",
      timestamp: `${year}年${month}月${day}日`,
    };

    setTodoItems([newTodo, ...todoItems]);
    setInputNewTodo("");
  };

  const inputTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputNewTodo(e.target.value);
  };

  const updateTodoStatus = (id: string, newStatus: string) => {
    setTodoItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
  };

  console.log(todoItems);

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
          <button type="submit" className={styles.addTodoButton}>
            <AddBoxIcon sx={{ width: "20%", height: "20%" }} />
          </button>
        </form>
      </div>

      {/* TodoAria */}
      <div className={styles.todoStatus}>
        <div className={styles.inProgress}>
          <div className={styles.inProgressTitle}>
            <AlarmIcon />
            <p>In Progress</p>
          </div>
          {todoItems
            .filter((todo) => todo.status === "inProgress")
            .map((todo) => (
              <div key={todo.id} className={styles.todoCard}>
                <Card sx={{ maxWidth: 276 }}>
                  <CardHeader
                    title={todo.todo}
                    subheader={todo.deadline || "No Deadline"}
                  />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      {todo.detail || "no detail"}
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing sx={{ justifyContent: "right" }}>
                    <IconButton
                      aria-label="in progress"
                      onClick={() => updateTodoStatus(todo.id, "inProgress")}
                    >
                      <AlarmIcon />
                    </IconButton>
                    <IconButton
                      aria-label="not started"
                      onClick={() => updateTodoStatus(todo.id, "notStarted")}
                    >
                      <AlarmOffIcon />
                    </IconButton>
                    <IconButton
                      aria-label="completed"
                      onClick={() => updateTodoStatus(todo.id, "completed")}
                    >
                      <CheckCircleIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              </div>
            ))}
        </div>

        <div className={styles.notStarted}>
          <div className={styles.notStartedTitle}>
            <AlarmOffIcon />
            <p>Not Started</p>
          </div>
          {todoItems
            .filter((todo) => todo.status === "notStarted")
            .map((todo) => (
              <div key={todo.id} className={styles.todoCard}>
                <Card sx={{ maxWidth: 276 }}>
                  <CardHeader
                    title={todo.todo}
                    subheader={todo.deadline || "No Deadline"}
                  />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      {todo.detail || "no detail"}
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing sx={{ justifyContent: "right" }}>
                    <IconButton
                      aria-label="in progress"
                      onClick={() => updateTodoStatus(todo.id, "inProgress")}
                    >
                      <AlarmIcon />
                    </IconButton>
                    <IconButton
                      aria-label="not started"
                      onClick={() => updateTodoStatus(todo.id, "notStarted")}
                    >
                      <AlarmOffIcon />
                    </IconButton>
                    <IconButton
                      aria-label="completed"
                      onClick={() => updateTodoStatus(todo.id, "completed")}
                    >
                      <CheckCircleIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              </div>
            ))}
        </div>

        <div className={styles.completed}>
          <div className={styles.completedTitle}>
            <CheckCircleIcon />
            <p>Completed</p>
          </div>
          {todoItems
            .filter((todo) => todo.status === "completed")
            .map((todo) => (
              <div key={todo.id} className={styles.todoCard}>
                <Card sx={{ maxWidth: 276 }}>
                  <CardHeader
                    title={todo.todo}
                    subheader={todo.deadline || "No Deadline"}
                  />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      {todo.detail || "no detail"}
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing sx={{ justifyContent: "right" }}>
                    <IconButton
                      aria-label="in progress"
                      onClick={() => updateTodoStatus(todo.id, "inProgress")}
                    >
                      <AlarmIcon />
                    </IconButton>
                    <IconButton
                      aria-label="not started"
                      onClick={() => updateTodoStatus(todo.id, "notStarted")}
                    >
                      <AlarmOffIcon />
                    </IconButton>
                    <IconButton
                      aria-label="completed"
                      onClick={() => updateTodoStatus(todo.id, "completed")}
                    >
                      <CheckCircleIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
