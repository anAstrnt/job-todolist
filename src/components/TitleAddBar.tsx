import React, { useContext, useState } from "react";
import styles from "./TitleAddBar.module.css";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import TocIcon from "@mui/icons-material/Toc";
import AddIcon from "@mui/icons-material/Add";
import { todoContext } from "../context/Todos";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

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

const TitleAddBar: React.FC = () => {
  const ctx = useContext(todoContext);
  const [inputTitle, setInputTitle] = useState("");
  const [titleLists, setTitleLists] = useState<newTitle[]>([]);

  type newTitle = {
    id: string;
    title: string;
    link: string;
  };

  // サイドバーへタイトルの追加
  const addTitle = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newTitle: newTitle = {
      id: uuidv4(),
      title: inputTitle,
      link: `/${inputTitle}`,
    };
    setTitleLists([newTitle, ...titleLists]);
    setInputTitle("");
  };

  //タイトルをクリックしページ遷移
  const onTodoPage = (link: string) => {
    ctx.setIsLinks(link);
  };

  return (
    <div className={styles.titleAddBar}>
      <div className={styles.appName}>
        <p>JOB.</p>
        <p>TODO</p>
        <p>DATA</p>
      </div>
      <form onSubmit={(e) => addTitle(e)} className={styles.addTitleForm}>
        <input
          type="text"
          name="inputTitle"
          placeholder="Add Title"
          className={styles.inputTitle}
          value={inputTitle}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setInputTitle(e.target.value)
          }
        />
        <button disabled={!inputTitle} type="submit" className={styles.addTitleButton}>
          <AddIcon sx={{ marginLeft: "10px", cursor: "pointer" }} />
        </button>
      </form>
      <List
        sx={titleList}
        aria-label="todoLists"
        style={{ width: "100%", marginLeft: "auto" }}
      >
        {titleLists.map((title) => (
          <div key={title.id}>
            <Link to={title.link}>
              <Button
                type="button"
                style={{ color: "#000", width: "100%" }}
                onClick={() => {
                  onTodoPage(title.link);
                }}
              >
                <ListItem>
                  <TocIcon />
                  <ListItemText primary={title.title} style={{ paddingLeft: 10 }} />
                </ListItem>
              </Button>
            </Link>
            <Divider component="li" />
          </div>
        ))}
      </List>
    </div>
  );
};

export default TitleAddBar;
