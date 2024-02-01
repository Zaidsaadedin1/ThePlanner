import React, { createContext, useContext, useState, ReactNode } from "react";
import { TaskModel } from "@/Interfaces/TaskInterface ";

interface ListOfTasksContextProps {
  listOfTasks: TaskModel[];
  setListOfTasksValues: (list: TaskModel[]) => void;
}

const listOfTasksContext = createContext<ListOfTasksContextProps | undefined>(
  undefined
);

interface ListOfTasksProviderProps {
  children: ReactNode;
}

export const ListOfTasksProvider: React.FC<ListOfTasksProviderProps> = ({
  children,
}) => {
  const [listOfTasks, setListOfTasks] = useState<TaskModel[]>([]);

  const setListOfTasksValues = (list: TaskModel[]) => {
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
  if (!context) {
    throw new Error("useListOfTasks must be used within a ListOfTasksProvider");
  }
  return context;
};
