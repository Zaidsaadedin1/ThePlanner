"use client";

import { apis } from "@/Apis";
import { FilteredTasks } from "@/Interfaces/TaskInterface ";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { useListOfTasks } from "@/Contexts/ListOfTasksContext";

interface MainHeaderTextContextProps {
  MainHeader: string;
  setMainHeaderValue: (newMainHeader: string) => void;
}

interface NameContextProps {
  Name: string | null;
  setNameValue: (newName: string) => void;
}

interface PriorityContextProps {
  Priority: number | null;
  setPriorityValue: (Priority: number) => void;
}

interface IsCompleteContextProps {
  IsComplete: boolean;
  setIsCompleteValue: (IsComplete: boolean) => void;
}
const MainHeaderTextContext = createContext<MainHeaderTextContextProps>({
  MainHeader: "",
  setMainHeaderValue: () => {},
});

const NameContext = createContext<NameContextProps>({
  Name: null!,
  setNameValue: () => {},
});

const PriorityContext = createContext<PriorityContextProps>({
  Priority: null!,
  setPriorityValue: () => {},
});

const IsCompleteContext = createContext<IsCompleteContextProps>({
  IsComplete: false,
  setIsCompleteValue: () => {},
});

interface Props {
  children: ReactNode;
}

export const FilterProvider = ({ children }: Props) => {
  const { setListOfTasksValues } = useListOfTasks();

  const filteredTasks = async (filteredTasks: FilteredTasks) => {
    try {
      const result = await apis.filterTask(filteredTasks);
      console.log(result);
      setListOfTasksValues(result.data.assignments);
    } catch (error) {
      console.error("Error filtering tasks:", error);
    }
  };

  const [MainHeader, setMainHeader] = useState<string | undefined>("All Tasks");
  const [Name, setName] = useState<string | null>(null);
  const [Priority, setPriority] = useState<number | null>(null);
  const [IsComplete, setIsComplete] = useState<boolean>(false);

  const setMainHeaderValue = (newMainHeader: string) => {
    setMainHeader(newMainHeader);
  };

  const setNameValue = (newName: string) => {
    setName(newName);
    filteredTasks({ Priority, Name: newName, IsComplete });
  };

  const setPriorityValue = (newPriority: number) => {
    setPriority(newPriority);
    if (newPriority === 1) {
      setMainHeader("High Priority Tasks");
    } else if (newPriority === 2) {
      setMainHeader("Medium Priority Tasks");
    } else {
      setMainHeader("Low Priority Tasks");
    }
    filteredTasks({ Priority: newPriority, Name, IsComplete });
  };

  const setIsCompleteValue = (newIsComplete: boolean) => {
    setIsComplete(!newIsComplete);
    filteredTasks({ Priority, Name, IsComplete: newIsComplete });
  };

  return (
    <NameContext.Provider value={{ Name, setNameValue }}>
      <PriorityContext.Provider value={{ Priority, setPriorityValue }}>
        <IsCompleteContext.Provider value={{ IsComplete, setIsCompleteValue }}>
          <MainHeaderTextContext.Provider
            value={{ MainHeader: MainHeader || "", setMainHeaderValue }}
          >
            {children}
          </MainHeaderTextContext.Provider>
        </IsCompleteContext.Provider>
      </PriorityContext.Provider>
    </NameContext.Provider>
  );
};
export const useMainHeader = () => {
  const context = useContext(
    MainHeaderTextContext
  ) as MainHeaderTextContextProps;
  return context;
};
export const useName = () => {
  const context = useContext(NameContext) as NameContextProps;
  return context;
};

export const usePriority = () => {
  const context = useContext(PriorityContext) as PriorityContextProps;
  return context;
};

export const useIsComplete = () => {
  const context = useContext(IsCompleteContext) as IsCompleteContextProps;
  return context;
};
