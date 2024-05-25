import React from "react";
import styles from "./TodoPages.module.css";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";

export const TodoPages = () => {
  return (
    <div className={styles.todoPages}>
      <div className={styles.titleName}>
        <p>Title</p>
        <form className={styles.addTodoForm}>
          <input
            type="text"
            name="inputTitle"
            placeholder="Add Title"
            className={styles.inputTodo}
          />
          <button type="submit" className={styles.addTodoButton}>
            <AddCircleOutlinedIcon />
          </button>
        </form>
      </div>
      <div className={styles.todoStatus}>
        <div className={styles.inProgress}>
          <p>In Progress</p>
        </div>
        <div className={styles.notStarted}>
          <p>Not Started</p>
        </div>
        <div className={styles.completed}>
          <p>Completed</p>
        </div>
      </div>
    </div>
  );
};
