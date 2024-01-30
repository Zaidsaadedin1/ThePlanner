"use client";
import React from "react";
import Category from "./Category/Category";
import { useListOfCategories } from "@/Contexts/ListOfCategoryContext";
import { CategoryData } from "@/Interfaces/CategoryInterface";
function ListOfCategories() {
  const { listOfCategories } = useListOfCategories();
  return (
    <div className="h-[140px] overflow-y-auto flex flex-col">
      {listOfCategories ? (
        listOfCategories.map((category: CategoryData) => (
          <Category
            key={category.id}
            id={category.id}
            categoryName={category.categoryName}
          />
        ))
      ) : (
        <p>Loading categories...</p>
      )}
    </div>
  );
}

export default ListOfCategories;
