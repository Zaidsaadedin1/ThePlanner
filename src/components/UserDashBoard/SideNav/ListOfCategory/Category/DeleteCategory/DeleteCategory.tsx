import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { apis } from "@/Apis";
import { useListOfCategories } from "@/Contexts/ListOfCategoryContext";
import { FaRegTrashAlt } from "react-icons/fa";
import { toast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { TaskModel } from "@/Interfaces/TaskInterface ";

function DeleteCategoryComponent({ id }: { id: number }) {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const { setListOfCategoriesValues } = useListOfCategories();

  const deleteCategory = async (categoryId: number) => {
    const allTasks = await apis.getAllTasks();
    const tasksInCategory = allTasks.data.assignments.filter(
      (task: TaskModel) => task.categoryId === categoryId
    );

    if (tasksInCategory.length > 0) {
      toast({
        title: "Cannot Delete Category",
        description:
          "There are tasks associated with this category. Please remove them first.",
      });
      return;
    } else {
      const result = await apis.deleteCategory(categoryId);
      toast({
        title: "Category Deleted Successfully",
        description: "Your Category Has Been Deleted.",
      });
      toggleModal();
      setListOfCategoriesValues();
    }
  };

  return (
    <>
      <Toaster />
      <Dialog open={isModalVisible} modal={true} onOpenChange={toggleModal}>
        <DialogTrigger asChild>
          <Button variant="outline" className="border-0 outline-none">
            <FaRegTrashAlt />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Do You Want To Delete This Category?</DialogTitle>
            <DialogDescription>
              If You Delete This Category, You Can't Get It Back.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button
              className="bg-white hover:border-2 text-black hover:bg-white"
              onClick={toggleModal}
            >
              Cancel
            </Button>
            <Button
              onClick={() => deleteCategory(id)}
              className="bg-red-800 hover:border-2 hover:bg-red-800"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default DeleteCategoryComponent;
