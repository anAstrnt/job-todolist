import React from "react";
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
            <AddBoxIcon sx={{ width: "20%", height: "20%" }} />
          </button>
        </form>
      </div>
      <div className={styles.todoStatus}>
        <div className={styles.inProgress}>
          <div className={styles.inProgressTitle}>
            <AlarmIcon />
            <p>In Progress</p>
          </div>
          <Card sx={{ maxWidth: 276 }}>
            <CardHeader
              title="Shrimp and Chorizo Paella"
              subheader="September 14, 2016"
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                This impressive paella is a perfect party dish and a fun meal to cook
                together with your guests. Add 1 cup of frozen peas along with the
                mussels, if you like.
              </Typography>
            </CardContent>
            <CardActions disableSpacing sx={{ justifyContent: "right" }}>
              <IconButton aria-label="in progress">
                <AlarmIcon />
              </IconButton>
              <IconButton aria-label="not started">
                <AlarmOffIcon />
              </IconButton>
              <IconButton aria-label="completed">
                <CheckCircleIcon />
              </IconButton>
            </CardActions>
          </Card>
        </div>
        <div className={styles.notStarted}>
          <div className={styles.notStartedTitle}>
            <AlarmOffIcon />
            <p>Not Started</p>
          </div>
        </div>
        <div className={styles.completed}>
          <div className={styles.completedTitle}>
            <CheckCircleIcon />
            <p>Completed</p>
          </div>
        </div>
      </div>
    </div>
  );
};
