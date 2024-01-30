import React, { useState } from "react";
import { useModal } from "@/Contexts/AddCategoryToggle";
import { Input } from "@/components/ui/input";
import {
  DialogHeader,
  Dialog,
  DialogContent,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { apis } from "@/Apis";
import { useListOfCategories } from "@/Contexts/ListOfCategoryContext";
import { toast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";

function AddCategory() {
  const { setListOfCategoriesValues } = useListOfCategories();
  const { isModalVisible, toggleModal } = useModal();
  const [categoryName, setCategoryName] = useState<string>("");
  const [categoryNameError, setCategoryNameError] = useState<string>("");

  const resetForm = () => {
    setCategoryName("");
    setCategoryNameError("");
  };

  const addCategory = async () => {
    if (!categoryName) {
      setCategoryNameError("Category name cannot be empty");
      return;
    } else {
      setCategoryNameError("");
    }

    try {
      const result = await apis.addCategory(categoryName);
      if (result.status === 200) {
        toast({
          title: "Category Added Successfully",
          description: "Your new category has been added.",
        });
        setListOfCategoriesValues();
        resetForm();
        toggleModal();
      }
    } catch (error) {
      toast({
        title: "Filed to Add Category",
        description: "Category with this name is already available",
      });
    }
  };

  return (
    <>
      <Toaster />
      <Dialog open={isModalVisible} modal={true} onOpenChange={toggleModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <header className="">
              <h1 className="text-2xl font-bold">Add Category</h1>
            </header>
          </DialogHeader>
          <div className="justify-center flex-column">
            <Label className="text-lg">Category Name</Label>
            <Input
              className=" outline-none mt-4"
              placeholder="Add category Name..."
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
            <Label className="text-red-500 mb-6">{categoryNameError}</Label>
          </div>
          <DialogFooter className="flex justify-center">
            <button
              className={`w-28 bg-white px-4 py-2 rounded border  text-black-300 hover:border-black hover:border-2 hover:bg-white ml-2`}
              onClick={() => {
                resetForm();
                toggleModal();
              }}
            >
              Cancel
            </button>
            <button
              className="text-gray-300 px-4 py-2 rounded border border-gray-200 bg-black mr-7 w-28"
              onClick={addCategory}
            >
              Add
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AddCategory;
