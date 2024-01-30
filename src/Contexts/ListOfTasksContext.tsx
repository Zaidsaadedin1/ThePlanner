import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { TaskModel } from "@/Interfaces/TaskInterface ";
import { apis } from "@/Apis";

interface ListOfTasksContextProps {
  listOfTasks: TaskModel[];
  setListOfTasksValues: (list: TaskModel[]) => void;
  getTasks: () => Promise<void>;
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

  const getTasks = async () => {
    try {
      const result = await apis.getAllTasks();
      setListOfTasks(result.data.assignments);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <listOfTasksContext.Provider
      value={{ listOfTasks, setListOfTasksValues, getTasks }}
    >
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
