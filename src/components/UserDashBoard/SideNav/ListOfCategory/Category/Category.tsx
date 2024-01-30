"use client";
import React from "react";
import { GoTag } from "react-icons/go";
import { useName } from "@/Contexts/FiltrationContext";
import DeleteCategoryComponent from "./DeleteCategory/DeleteCategory";

function Category({ categoryName, id }: { categoryName: string; id: number }) {
  const { setNameValue } = useName();
  const filterTasks = (name: string) => {
    setNameValue(name);
  };

  return (
    <>
      <div className="flex flex-row justify-between">
        <button
          onClick={() => filterTasks(categoryName)}
          className="flex flex-row justify-start items-center mb-2 font-bold text-black"
        >
          <GoTag className="mr-2 text-black-600" />
          <h1 className="text-black">{categoryName}</h1>
        </button>
        <DeleteCategoryComponent id={id} />
      </div>
    </>
  );
}

export default Category;
