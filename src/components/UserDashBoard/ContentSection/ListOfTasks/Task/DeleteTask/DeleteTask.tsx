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
import { useState } from "react";
import { apis } from "@/Apis";
import { useListOfTasks } from "@/Contexts/ListOfTasksContext";
import { FaRegTrashAlt } from "react-icons/fa";
import { toast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";

function DeleteTask({ id }: { id: number }) {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const { getTasks } = useListOfTasks();
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const deleteTask = async (id: number) => {
    try {
      const result = await apis.deleteTask(id);
      if (result.status === 200) {
        toggleModal();
        getTasks();
        toast({
          title: "Task Deleted Successfully",
          description: "Your Task Has Been Deleted.",
        });
      }
    } catch (error) {
      toast({
        title: "Task Cant Be Deleted ",
        description: "Task Cant Be Deleted Something Wrong Happened",
      });
    }
  };

  return (
    <>
      <Toaster />
      <Dialog open={isModalVisible} modal={true} onOpenChange={toggleModal}>
        <DialogTrigger asChild>
          <Button variant="outline" className="bg-red-700 text-white">
            <FaRegTrashAlt />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Do You Want To Delete This Task?</DialogTitle>
            <DialogDescription>
              IF You Deleted This Task You Cant Get It Back..
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
              onClick={() => deleteTask(id)}
              className="bg-red-800 hover:border-2 hover:bg-red-800 "
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
export default DeleteTask;
