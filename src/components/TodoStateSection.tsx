import React from "react";
import styles from "./TodoStateSection.module.css";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import AlarmIcon from "@mui/icons-material/Alarm";
import AlarmOffIcon from "@mui/icons-material/AlarmOff";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Typography from "@mui/material/Typography";
import { FormControl, Grid, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import CreateIcon from "@mui/icons-material/Create";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  TextField,
} from "@mui/material";

type TodoStateSectionProps = {
  title: string;
  icon: React.ReactNode;
  statusFilter: {
    id: string;
    links: string;
    titles: string;
    todo: string;
    detail: string;
    status: string;
    deadline: string;
  }[];
  handleDeleteTodo: (id: string) => void;
  inputTodo: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputNewTodo: string;
  inputNewDeadline: string;
  inputNewStatus: string;
  inputNewDetail: string;
  inputDeadline: (e: React.ChangeEvent<HTMLInputElement>) => void;
  editableTodo: boolean;
  editableTodoOpen: () => void;
  updateTodos: (
    id: string,
    newTodo: string,
    newStatus: string,
    deadline: string,
    detail: string
  ) => void;
  updateStatus: (id: string, status: string) => void;
  updateTodoStatusInDialog: (e: SelectChangeEvent) => void;
  updateTodoDetailInDialog: (e: React.ChangeEvent<HTMLInputElement>) => void;
  dialogHandleOpen: () => void;
  dialogHandleClose: () => void;
  dialogOpen: boolean;
};

const TodoStateSection: React.FC<TodoStateSectionProps> = ({
  title,
  icon,
  handleDeleteTodo,
  statusFilter,
  inputTodo,
  inputNewTodo,
  inputNewDeadline,
  inputDeadline,
  inputNewStatus,
  inputNewDetail,
  editableTodo,
  editableTodoOpen,
  updateTodos,
  updateStatus,
  updateTodoStatusInDialog,
  updateTodoDetailInDialog,
  dialogHandleOpen,
  dialogHandleClose,
  dialogOpen,
}) => {
  return (
    // TodoCard
    <div className={styles.todoStatus}>
      <div className={styles.todoStatusTitle}>
        {icon}
        <p>{title}</p>
      </div>
      {statusFilter.map((todo) => (
        <div key={todo.id} className={styles.todoCard}>
          <Card sx={{ maxWidth: 276 }}>
            <CardHeader
              title={todo.todo}
              subheader={todo.deadline || "No Deadline"}
              action={
                <IconButton onClick={dialogHandleOpen}>
                  <KeyboardArrowDownRoundedIcon />
                </IconButton>
              }
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {todo.detail || "no detail"}
              </Typography>
            </CardContent>
            <CardActions disableSpacing sx={{ justifyContent: "space-between" }}>
              <IconButton onClick={() => handleDeleteTodo(todo.id)}>
                <RestoreFromTrashIcon />
              </IconButton>
              <Grid sx={{ justifyContent: "right" }}>
                <IconButton
                  aria-label="in progress"
                  onClick={() => updateStatus(todo.id, "inProgress")}
                >
                  <AlarmIcon />
                </IconButton>
                <IconButton
                  aria-label="not started"
                  onClick={() => updateStatus(todo.id, "notStarted")}
                >
                  <AlarmOffIcon />
                </IconButton>
                <IconButton
                  aria-label="completed"
                  onClick={() => updateStatus(todo.id, "completed")}
                >
                  <CheckCircleIcon />
                </IconButton>
              </Grid>
            </CardActions>
          </Card>

          {/* detailDialog */}
          <Dialog
            open={dialogOpen}
            onClose={dialogHandleClose}
            PaperProps={{
              component: "form",
              onSubmit: (e: React.FormEvent<HTMLFormElement>) => {
                e.preventDefault();
                updateTodos(
                  todo.id,
                  inputNewTodo,
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
                    value={inputNewTodo}
                    onChange={inputTodo}
                  />
                ) : (
                  inputNewTodo || todo.todo
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
        </div>
      ))}
    </div>
  );
};

export default TodoStateSection;
