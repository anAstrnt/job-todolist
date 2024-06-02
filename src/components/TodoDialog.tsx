import React, { useState } from "react";
import styles from "./TodoDialog.module.css";
import { FormControl, MenuItem, Select } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CreateIcon from "@mui/icons-material/Create";
import { SelectChangeEvent } from "@mui/material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  TextField,
} from "@mui/material";

type TodoDialogProps = {
  todo: {
    id: string;
    links: string;
    titles: string;
    todo: string;
    detail: string;
    status: string;
    deadline: string;
  };
  updateTodos: (
    id: string,
    newTodo: string,
    newStatus: string,
    deadline: string,
    detail: string
  ) => void;
  dialogHandleClose: () => void;
  dialogOpen: boolean;
};

const TodoDialog: React.FC<TodoDialogProps> = ({
  todo,
  updateTodos,
  dialogHandleClose,
  dialogOpen,
}) => {
  const [editableTodo, setEditableTodo] = useState(false);
  const [updateNewTodo, setUpdateNewTodo] = useState("");
  const [inputNewDeadline, setInputNewDeadline] = useState("");
  const [inputNewStatus, setInputNewStatus] = useState("");
  const [inputNewDetail, setInputNewDetail] = useState("");

  // Todo表示かTodo編集かを切り替え
  const editableTodoOpen = () => {
    setEditableTodo(!editableTodo);
  };

  // 各種Todoの詳細編集処理
  const updateTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateNewTodo(e.target.value);
  };
  const inputDeadline = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputNewDeadline(e.target.value);
  };
  const updateTodoStatusInDialog = (e: SelectChangeEvent) => {
    setInputNewStatus(e.target.value);
  };
  const updateTodoDetailInDialog = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputNewDetail(e.target.value);
  };

  return (
    <>
      <Dialog
        open={dialogOpen}
        onClose={dialogHandleClose}
        PaperProps={{
          component: "form",
          onSubmit: (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            updateTodos(
              todo.id,
              updateNewTodo,
              inputNewStatus,
              inputNewDeadline,
              inputNewDetail
            );
            dialogHandleClose();
          },
        }}
      >
        {/* Todo Name */}
        <DialogContent sx={{ width: "400px" }}>
          <DialogContentText sx={{ display: "inline-block", fontSize: "50px" }}>
            {editableTodo ? (
              <TextField
                id={todo.id}
                type="text"
                sx={{ fontSize: "17px" }}
                value={updateNewTodo}
                onChange={updateTodo}
              />
            ) : (
              updateNewTodo || todo.todo
            )}
          </DialogContentText>
          <IconButton sx={{ paddingLeft: "25px" }} onClick={editableTodoOpen}>
            <CreateIcon />
          </IconButton>
        </DialogContent>

        <DialogContent>
          {/* Status */}
          <DialogContentText
            sx={{ fontSize: "20px", letterSpacing: "3px", paddingBottom: "10px" }}
          >
            Status
          </DialogContentText>
          <FormControl fullWidth>
            <Select
              labelId={todo.id}
              id={todo.id}
              value={inputNewStatus}
              onChange={updateTodoStatusInDialog}
            >
              <MenuItem value={"inProgress"}>In Progress</MenuItem>
              <MenuItem value={"notStarted"}>Not Started</MenuItem>
              <MenuItem value={"completed"}>Completed</MenuItem>
            </Select>
          </FormControl>
          {/* Deadline */}
          <DialogContentText
            sx={{ fontSize: "20px", letterSpacing: "3px", paddingBottom: "10px" }}
          >
            Deadline
          </DialogContentText>
          <input
            type="date"
            id={todo.id}
            className={styles.inputTodoDeadline}
            name="todo-deadline"
            min="2024-05-01"
            max="2030-3-31"
            value={inputNewDeadline}
            onChange={inputDeadline}
          />
          {/* Detail */}
          <DialogContentText
            sx={{
              fontSize: "20px",
              letterSpacing: "3px",
              paddingTop: "10px",
              paddingBottom: "10px",
            }}
          >
            Detail
          </DialogContentText>
          <TextField
            id={todo.id}
            multiline
            rows={4}
            variant="filled"
            sx={{ width: "100%" }}
            value={inputNewDetail}
            onChange={updateTodoDetailInDialog}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={dialogHandleClose}>Cancel</Button>
          <Button type="submit">setting</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TodoDialog;
