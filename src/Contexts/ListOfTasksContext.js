"use client";
import { createContext, useContext, useState } from "react";

const listOfTasksContext = createContext();

export const ListOfTasksProvider = ({ children }) => {
  const [listOfTasks, setListOfTasks] = useState([]);

  const setListOfTasksValues = (list) => {
    setListOfTasks(list);
  };

  return (
    <listOfTasksContext.Provider value={{ listOfTasks, setListOfTasksValues }}>
      {children}
    </listOfTasksContext.Provider>
  );
};

export const useListOfTasks = () => {
  const context = useContext(listOfTasksContext);
  return context;
};
