"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { FaRegFlag } from "react-icons/fa";
import { TaskModel } from "@/Interfaces/TaskInterface ";
import { formatDistanceToNow } from "date-fns";
import { useEffect, useState } from "react";
import { apis } from "@/Apis";
import { AssignedUser, User } from "@/Interfaces/UserInterface";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import EditTask from "./EditTask/EditTask";
import DeleteTask from "./DeleteTask/DeleteTask";
import { toast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";

function Task({ task }: { task: TaskModel }) {
  const [assignedUsers, setAssignedUsers] = useState<AssignedUser[]>([]);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  useEffect(() => {
    getAssignedUsers();
  }, []);

  const getAssignedUsers = async () => {
    try {
      const result = await apis.getAllUsersAssignedToTask(task.id);
      setAssignedUsers(result);
    } catch (error) {
      console.error("Error fetching assigned users:", error);
    }
  };

  const assignUsersToAssignment = async () => {
    try {
      const result = await apis.assignAssignment(selectedUsers, task.id);
      getAssignedUsers();
      toggleModal();
      if (result.status === 200) {
        toast({
          title: "Success Assigning Users",
          description: "Success Assigning Users To Task.",
        });
      }
    } catch (error) {
      toast({
        title: "Failed To Assigning Users ",
        description: "Failed To Assigning Users To The Task",
      });
    }
  };

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const response = await apis.getAllUsers();
        const responseData = response.data.users;
        setAllUsers(responseData);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    getAllUsers();
  }, []);

  const getPriorityColor = () => {
    switch (task.priority) {
      case 1:
        return "text-red-600";
      case 2:
        return "text-yellow-300";
      case 3:
        return "text-green-500";
      default:
        return "text-green-500";
    }
  };

  const getDueDateLabel = () => {
    if (task.isCompleted) {
      return "Done";
    } else if (task.dueDate) {
      const distanceToNow = formatDistanceToNow(new Date(task.dueDate));
      return `Due ${distanceToNow}`;
    }
    return "Open Task";
  };

  return (
    <>
      <Toaster />
      <div className="w-12/12 border-2 m-3 p-4 rounded-md ">
        <div className="flex flex-row justify-between w-full">
          <section className="w-full">
            <div className="flex justify-between">
              <section>
                <h1 className="text-black-600 font-bold text-lg">
                  {task.name}
                </h1>
              </section>
              <section className="flex flex-row items-center">
                <FaRegFlag
                  className={`mr-3 text-black-600 size-4 ${getPriorityColor()}`}
                />
                <Badge variant="secondary">{getDueDateLabel()}</Badge>
              </section>
            </div>
            <h4 className="text-gray-500">{task.description}</h4>
            <section className="flex  justify-between items-end ">
              <div className="flex  justify-center items-center text-center">
                <div className="flex flex-row justify-center items-center ">
                  <div className="flex flex-row items-center mr-4">
                    {assignedUsers.length > 0 ? (
                      assignedUsers.map((user: AssignedUser, index) => (
                        <Avatar key={index} className="mr-3 mt-3 size-7 ">
                          <AvatarImage key={user.UserId} src={user.imageUrl} />
                        </Avatar>
                      ))
                    ) : (
                      <div className="flex flex-row">
                        <div className="mr-3">
                          <p>Task Not Assigned</p>
                        </div>
                        <div className="mb-0">
                          <Dialog
                            open={isModalVisible}
                            modal={true}
                            onOpenChange={toggleModal}
                          >
                            <DialogTrigger>
                              <Button className="h-6 mb-0">Assign</Button>
                            </DialogTrigger>
                            <DialogContent className="w-80">
                              <DialogHeader>
                                <header className="mb-4">
                                  <h1 className="text-2xl font-bold">
                                    Assign Users
                                  </h1>
                                </header>
                              </DialogHeader>
                              <div>
                                <div className="relative">
                                  <label className="block mb-1 font-bold">
                                    Assign Users To Task
                                  </label>
                                  <div className="space-y-2">
                                    {allUsers.map((user: User) => (
                                      <div
                                        key={user.id}
                                        className="flex items-center"
                                      >
                                        <input
                                          type="checkbox"
                                          id={`user_${user.id}`}
                                          value={user.id}
                                          className="mr-2"
                                          onChange={(e) => {
                                            const userId = e.target.value;
                                            if (e.target.checked) {
                                              setSelectedUsers(
                                                (prevSelectedUsers) => [
                                                  ...prevSelectedUsers,
                                                  allUsers.find(
                                                    (user) => user.id === userId
                                                  )!,
                                                ]
                                              );
                                            } else {
                                              setSelectedUsers(
                                                (prevSelectedUsers) =>
                                                  prevSelectedUsers.filter(
                                                    (user) => user.id !== userId
                                                  )
                                              );
                                            }
                                          }}
                                        />
                                        <label
                                          htmlFor={`user_${user.id}`}
                                          className="text-black"
                                        >
                                          {user.username}
                                        </label>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                              <div>
                                <DialogFooter className="flex justify-center mb-4 mt-4">
                                  <Button
                                    className={`w-28 bg-white px-4 py-2 rounded border  text-black-300 hover:border-black hover:border-2 hover:bg-white ml-2`}
                                    onClick={toggleModal}
                                  >
                                    Cancel
                                  </Button>
                                  <Button
                                    className={`w-28 text-gray-300 px-4  rounded border border-gray-200 bg-black`}
                                    onClick={() => {
                                      assignUsersToAssignment();
                                    }}
                                  >
                                    Assign
                                  </Button>
                                </DialogFooter>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center flex-row">
                <div>
                  <DeleteTask id={task.id} />
                </div>
                <div>
                  <EditTask task={task} />
                </div>
              </div>
            </section>
          </section>
        </div>
      </div>
    </>
  );
}

export default Task;
