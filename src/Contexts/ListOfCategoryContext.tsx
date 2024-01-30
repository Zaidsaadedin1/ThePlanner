"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { apis } from "@/Apis";
import { CategoryData } from "@/Interfaces/CategoryInterface";

interface ListOfCategoriesContextProps {
  listOfCategories: CategoryData[];
  setListOfCategoriesValues: () => void;
}

const listOfCategoriesContext = createContext<
  ListOfCategoriesContextProps | undefined
>(undefined);

interface ListOfCategoriesProviderProps {
  children: ReactNode;
}

export const ListOfCategoriesProvider: React.FC<
  ListOfCategoriesProviderProps
> = ({ children }) => {
  async function getAllCategories() {
    const result = await apis.getALLCategories();
    setListOfCategories(result.data);
  }

  const [listOfCategories, setListOfCategories] = useState<CategoryData[]>([]);

  const setListOfCategoriesValues = () => {
    getAllCategories();
  };

  return (
    <listOfCategoriesContext.Provider
      value={{ listOfCategories: listOfCategories, setListOfCategoriesValues }}
    >
      {children}
    </listOfCategoriesContext.Provider>
  );
};

export const useListOfCategories = () => {
  const context = useContext(listOfCategoriesContext);
  if (!context) {
    throw new Error(
      "useListOfCategories must be used within a ListOfCategoriesProvider"
    );
  }
  return context;
};
