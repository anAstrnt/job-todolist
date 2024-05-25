import React, { createContext, useCallback, useState } from "react";
import { v4 as uuidv4 } from "uuid";

type todoContext = {
  todoIds: string;
  setIsTodoIds: (ids: string) => void;
  jobTitles: string;
  setIsJobTitles: (titles: string) => void;
  todo: string;
  setIsTodo: (todo: string) => void;
  todoDetail: string;
  setIsTodoDetail: (detail: string) => void;
  todoStatus: string;
  setIsTodoStatus: (status: string) => void;
  todoDeadline: string;
  setIsTodoDeadline: (deadline: string) => void;
  todoTimestamp: string;
  setIsTodoTimestamp: (timestamp: string) => void;
  newTodoItems: {
    id: string;
    titles: string;
    todo: string;
    detail: string;
    status: string;
    deadline: string;
    timestamp: string;
  }[];
  setIsNewTodoItems: (
    id: string,
    titles: string,
    todo: string,
    detail: string,
    status: string,
    deadline: string,
    timestamp: string
  ) => void;
};

const defaultTodoContext: todoContext = {
  todoIds: uuidv4(),
  setIsTodoIds: () => {},
  jobTitles: "",
  setIsJobTitles: () => {},
  todo: "",
  setIsTodo: () => {},
  todoDetail: "",
  setIsTodoDetail: () => {},
  todoStatus: "",
  setIsTodoStatus: () => {},
  todoDeadline: "",
  setIsTodoDeadline: () => {},
  todoTimestamp: "",
  setIsTodoTimestamp: () => {},
  newTodoItems: [
    {
      id: "",
      titles: "",
      todo: "",
      detail: "",
      status: "",
      deadline: "",
      timestamp: "",
    },
  ],
  setIsNewTodoItems: () => {},
};

export const todoContext = createContext<todoContext>(defaultTodoContext);

export const Todos = (): todoContext => {
  const [todoIds, setTodoIds] = useState("");
  const [jobTitles, setJobTitles] = useState("");
  const [todo, setTodo] = useState("");
  const [todoDetail, setTodoDetail] = useState("");
  const [todoStatus, setTodoStatus] = useState("");
  const [todoDeadline, setTodoDeadline] = useState("");
  const [todoTimestamp, setTodoTimestamp] = useState("");
  const [newTodoItems, setNewTodoItems] = useState([
    {
      id: "",
      titles: "",
      todo: "",
      detail: "",
      status: "",
      deadline: "",
      timestamp: "",
    },
  ]);

  const setIsTodoIds = useCallback((current: string): void => {
    setTodoIds(current);
  }, []);
  const setIsJobTitles = useCallback((current: string): void => {
    setJobTitles(current);
  }, []);
  const setIsTodo = useCallback((current: string): void => {
    setTodo(current);
  }, []);
  const setIsTodoDetail = useCallback((current: string): void => {
    setTodoDetail(current);
  }, []);
  const setIsTodoStatus = useCallback((current: string): void => {
    setTodoStatus(current);
  }, []);
  const setIsTodoDeadline = useCallback((current: string): void => {
    setTodoDeadline(current);
  }, []);
  const setIsTodoTimestamp = useCallback((current: string): void => {
    setTodoTimestamp(current);
  }, []);
  const setIsNewTodoItems = useCallback(
    (
      todoIds: string,
      jobTitles: string,
      todo: string,
      todoDetail: string,
      todoStatus: string,
      todoDeadline: string,
      todoTimestamp: string
    ): void => {
      setNewTodoItems((prevItems) => [
        ...prevItems,
        {
          id: todoIds,
          titles: jobTitles,
          todo: todo,
          detail: todoDetail,
          status: todoStatus,
          deadline: todoDeadline,
          timestamp: todoTimestamp,
        },
      ]);
    },
    []
  );

  return {
    todoIds,
    setIsTodoIds,
    jobTitles,
    setIsJobTitles,
    todo,
    setIsTodo,
    todoDetail,
    setIsTodoDetail,
    todoStatus,
    setIsTodoStatus,
    todoDeadline,
    setIsTodoDeadline,
    todoTimestamp,
    setIsTodoTimestamp,
    newTodoItems,
    setIsNewTodoItems,
  };
};
