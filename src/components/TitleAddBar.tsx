import React, { useState } from "react";
import styles from "./TitleAddBar.module.css";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { Box, TextField } from "@mui/material";
import TocIcon from "@mui/icons-material/Toc";
import AddIcon from "@mui/icons-material/Add";

const titleList = {
  p: 0,
  width: "100%",
  maxWidth: 360,
  borderRadius: 2,
  border: "1px solid",
  borderColor: "divider",
  backgroundColor: "background.paper",
  marginTop: "50px",
};

const TitleAddBar = () => {
  const [title, setTitle] = useState("");
  const titleLists: string[] = ["inbox", "mail", "job", "power"];

  const addTitle = () => {};

  return (
    <div className={styles.titleAddBar}>
      <div className={styles.appName}>
        <p>JOB</p>
        <p>TODO</p>
        <p>DATA</p>
      </div>
      <form onSubmit={addTitle} className={styles.addTitleForm}>
        <input
          type="text"
          placeholder="Add Title"
          className={styles.inputTitle}
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
        />
        <AddIcon sx={{ marginLeft: "18px" }} />
      </form>
      <List sx={titleList} aria-label="mailbox folders">
        {titleLists.map((title) => (
          <>
            <ListItem>
              <TocIcon />
              <ListItemText primary={title} style={{ paddingLeft: 10 }} />
            </ListItem>
            <Divider component="li" />
          </>
        ))}
      </List>
      ;
    </div>
  );
};

export default TitleAddBar;
