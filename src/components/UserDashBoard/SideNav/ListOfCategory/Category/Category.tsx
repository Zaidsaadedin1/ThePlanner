"use client";
import React from "react";
import { GoTag } from "react-icons/go";
import { useCategoryId } from "@/Contexts/FiltrationContext";
import DeleteCategoryComponent from "./DeleteCategory/DeleteCategory";

function Category({ categoryName, id }: { categoryName: string; id: number }) {
  const { setCategoryIdValue } = useCategoryId();
  const filterTasks = (CategoryIdValue: number) => {
    setCategoryIdValue(CategoryIdValue);
  };

  return (
    <>
      <div className="flex flex-row justify-between">
        <button
          onClick={() => filterTasks(id)}
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
