import React, { useState } from "react";
import styles from "./TodoStateSection.module.css";
import TodoDialog from "./TodoDialog";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import AlarmIcon from "@mui/icons-material/Alarm";
import AlarmOffIcon from "@mui/icons-material/AlarmOff";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";

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
  updateTodos: (
    id: string,
    newTodo: string,
    newStatus: string,
    deadline: string,
    detail: string
  ) => void;
  updateStatus: (id: string, status: string) => void;
};

const TodoStateSection: React.FC<TodoStateSectionProps> = ({
  title,
  icon,
  handleDeleteTodo,
  statusFilter,
  updateTodos,
  updateStatus,
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const dialogHandleOpen = () => {
    setDialogOpen(true);
  };
  const dialogHandleClose = () => {
    setDialogOpen(false);
  };

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
          <TodoDialog
            todo={todo}
            updateTodos={updateTodos}
            dialogHandleClose={dialogHandleClose}
            dialogOpen={dialogOpen}
          />
        </div>
      ))}
    </div>
  );
};

export default TodoStateSection;
