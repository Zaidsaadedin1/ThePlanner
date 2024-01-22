"use client";
import React from "react";
import { GoTag } from "react-icons/go";
import { useName } from "@/Contexts/FiltrationContext";

interface Category {
  id: number;
  categoryName: string;
}

function Category({ categoryName }: Category) {
  const { setNameValue } = useName();

  const filterTasks = (name: string) => {
    setNameValue(name);
  };
  return (
    <>
      <button
        onClick={() => filterTasks(categoryName)}
        className="flex flex-row justify-start items-center mb-2 font-bold text-black"
      >
        <GoTag className="mr-2 text-black-600" />
        <h1 className="text-black">{categoryName}</h1>
      </button>
    </>
  );
}

export default Category;
