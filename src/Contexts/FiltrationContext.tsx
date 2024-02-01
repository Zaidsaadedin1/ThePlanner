import { apis } from "@/Apis";
import { FilteredTasks } from "@/Interfaces/TaskInterface ";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useListOfTasks } from "@/Contexts/ListOfTasksContext";

interface MainHeaderTextContextProps {
  MainHeader: string;
  setMainHeaderValue: (newMainHeader: string) => void;
}

interface CategoryIdContextProps {
  CategoryId: number | null;
  setCategoryIdValue: (newCategoryId: number | null) => void;
}

interface PriorityContextProps {
  Priority: number | null;
  setPriorityValue: (newPriority: number | null) => void;
}

interface IsCompleteContextProps {
  IsComplete: boolean;
  setIsCompleteValue: (newIsComplete: boolean) => void;
}

const MainHeaderTextContext = createContext<MainHeaderTextContextProps>({
  MainHeader: "",
  setMainHeaderValue: () => {},
});

const CategoryIdContext = createContext<CategoryIdContextProps>({
  CategoryId: null,
  setCategoryIdValue: () => {},
});

const PriorityContext = createContext<PriorityContextProps>({
  Priority: null,
  setPriorityValue: () => {},
});

const IsCompleteContext = createContext<IsCompleteContextProps>({
  IsComplete: false,
  setIsCompleteValue: () => {},
});

const ResetFilterContext = createContext<{
  resetFilters: () => void;
  initialFiltration: () => void;
}>({
  resetFilters: () => {},
  initialFiltration: () => {},
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
  const initialCategoryId = null;
  const initialPriority = null;
  const initialIsComplete = false;

  const resetFilters = () => {
    setMainHeader(initialMainHeader);
    setCategoryId(initialCategoryId);
    setPriority(initialPriority);
    setIsComplete(initialIsComplete);
    filteredTasks({
      Priority: initialPriority,
      CategoryId: initialCategoryId,
      IsComplete: initialIsComplete,
    });
  };

  const [MainHeader, setMainHeader] = useState<string | undefined>(
    initialMainHeader
  );
  const [CategoryId, setCategoryId] = useState<number | null>(
    initialCategoryId
  );
  const [Priority, setPriority] = useState<number | null>(initialPriority);
  const [IsComplete, setIsComplete] = useState<boolean>(initialIsComplete);

  const setMainHeaderValue = (newMainHeader: string) => {
    setMainHeader(newMainHeader);
  };

  const setCategoryIdValue = (categoryId: number | null) => {
    setCategoryId(categoryId);
    filteredTasks({ Priority, CategoryId: categoryId, IsComplete });
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
    filteredTasks({ Priority: newPriority, CategoryId, IsComplete });
  };

  const setIsCompleteValue = (newIsComplete: boolean) => {
    setIsComplete(newIsComplete);
    filteredTasks({ Priority, CategoryId, IsComplete: newIsComplete });
  };

  const initialFiltration = () => {
    filteredTasks({ Priority: null, CategoryId: null, IsComplete: false });
  };

  useEffect(() => {
    initialFiltration();
  }, []);

  return (
    <CategoryIdContext.Provider value={{ CategoryId, setCategoryIdValue }}>
      <PriorityContext.Provider value={{ Priority, setPriorityValue }}>
        <IsCompleteContext.Provider value={{ IsComplete, setIsCompleteValue }}>
          <MainHeaderTextContext.Provider
            value={{ MainHeader: MainHeader || "", setMainHeaderValue }}
          >
            <ResetFilterContext.Provider
              value={{ resetFilters, initialFiltration }}
            >
              {children}
            </ResetFilterContext.Provider>
          </MainHeaderTextContext.Provider>
        </IsCompleteContext.Provider>
      </PriorityContext.Provider>
    </CategoryIdContext.Provider>
  );
};

export const useMainHeader = () => {
  const context = useContext(
    MainHeaderTextContext
  ) as MainHeaderTextContextProps;
  return context;
};

export const useCategoryId = () => {
  const context = useContext(CategoryIdContext) as CategoryIdContextProps;
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
