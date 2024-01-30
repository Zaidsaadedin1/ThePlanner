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
const ResetFilterContext = createContext<{ resetFilters: () => void }>({
  resetFilters: () => {},
});

interface Props {
  children: ReactNode;
}
export const FilterProvider = ({ children }: Props) => {
  const { setListOfTasksValues } = useListOfTasks();

  const filteredTasks = async (filteredTasks: FilteredTasks) => {
    try {
      const result = await apis.filterTask(filteredTasks);
      setListOfTasksValues(result.data.assignments);
    } catch (error) {
      console.error("Error filtering tasks:", error);
    }
  };

  const initialMainHeader = "All Tasks";
  const initialCategoryName = null;
  const initialPriority = null;
  const initialIsComplete = false;

  const resetFilters = () => {
    setMainHeader(initialMainHeader);
    setCategoryName(initialCategoryName);
    setPriority(initialPriority);
    setIsComplete(initialIsComplete);
    filteredTasks({
      Priority: initialPriority,
      Name: initialCategoryName,
      IsComplete: initialIsComplete,
    });
  };

  const [MainHeader, setMainHeader] = useState<string | undefined>(
    initialMainHeader
  );
  const [CategoryName, setCategoryName] = useState<string | null>(
    initialCategoryName
  );
  const [Priority, setPriority] = useState<number | null>(initialPriority);
  const [IsComplete, setIsComplete] = useState<boolean>(initialIsComplete);

  const setMainHeaderValue = (newMainHeader: string) => {
    setMainHeader(newMainHeader);
  };

  const setNameValue = (newName: string) => {
    setCategoryName(newName);
    filteredTasks({ Priority, Name: newName, IsComplete });
  };

  const setPriorityValue = (newPriority: number | null) => {
    setPriority(newPriority);
    if (newPriority === 1) {
      setMainHeader("High Priority Tasks");
    } else if (newPriority === 2) {
      setMainHeader("Medium Priority Tasks");
    } else {
      setMainHeader("Low Priority Tasks");
    }
    filteredTasks({ Priority: newPriority, Name: CategoryName, IsComplete });
  };

  const setIsCompleteValue = (newIsComplete: boolean) => {
    setIsComplete(newIsComplete);
    filteredTasks({ Priority, Name: CategoryName, IsComplete: newIsComplete });
  };

  return (
    <NameContext.Provider value={{ Name: CategoryName, setNameValue }}>
      <PriorityContext.Provider value={{ Priority, setPriorityValue }}>
        <IsCompleteContext.Provider value={{ IsComplete, setIsCompleteValue }}>
          <MainHeaderTextContext.Provider
            value={{ MainHeader: MainHeader || "", setMainHeaderValue }}
          >
            <ResetFilterContext.Provider value={{ resetFilters }}>
              {children}
            </ResetFilterContext.Provider>
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
export const useResetFilters = () => {
  const { resetFilters } = useContext(ResetFilterContext);
  return resetFilters;
};
