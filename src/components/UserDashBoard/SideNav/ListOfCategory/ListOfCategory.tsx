"use client";
import React, { useState, useEffect } from "react";
import Category from "./Category/Category";
import { apis } from "@/Apis";

interface CategoryData {
  id: number;
  categoryName: string;
}

function ListOfCategories() {
  const [listOfCategories, setListOfCategories] = useState<CategoryData[]>([]);

  useEffect(() => {
    getAllCategories();
  }, []);

  async function getAllCategories() {
    try {
      const result = await apis.getALLCategories();
      setListOfCategories(result.data.categories);
      console.log(result);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  return (
    <div>
      {listOfCategories ? (
        listOfCategories.map((category, index) => (
          <Category
            key={index}
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
