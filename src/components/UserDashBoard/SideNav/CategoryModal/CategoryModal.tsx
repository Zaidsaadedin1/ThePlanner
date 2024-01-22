"use client";
import React, { useState } from "react";
import { useModal } from "@/Contexts/AddCategoryToggle";
import { Input } from "@/components/ui/input";
import { DialogHeader, Dialog, DialogContent } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { apis } from "@/Apis";
import { DialogClose } from "@radix-ui/react-dialog";

function CategoryModal() {
  const { isModalVisible, toggleModal } = useModal();
  const [categoryName, setCategoryName] = useState<string>("");

  const addCategory = async () => {
    try {
      const result = await apis.addCategory(categoryName);
      console.log(result.data.message);
    } catch (error) {
      console.error("Error adding category:", error);
    }
    toggleModal();
  };

  return (
    <Dialog open={isModalVisible} modal={true}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <header className="">
            <h1 className="text-2xl font-bold">Add Category</h1>
          </header>
        </DialogHeader>
        <div className=" justify-center  flex-column ">
          <Label className="text-lg">Category Name</Label>
          <Input
            className="mb-5 outline-none mt-4"
            placeholder="Add category Name..."
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </div>
        <footer className="flex justify-center">
          <button
            className="text-gray-300 px-4 py-2 rounded border border-gray-200 bg-black mr-7 w-20"
            onClick={addCategory}
          >
            Add
          </button>
          <button
            className="bg-black px-4 py-2 rounded border border-gray-200 text-gray-300 w-20"
            onClick={toggleModal}
          >
            Cancel
          </button>
        </footer>
      </DialogContent>
    </Dialog>
  );
}

export default CategoryModal;
