"use client";
import React from "react";
import Task from "./Task/Task";
import { useListOfTasks } from "@/Contexts/ListOfTasksContext";
import { TaskInterface } from "@/Interfaces/TaskInterface ";

function ListOfTasks() {
  const { listOfTasks } = useListOfTasks();

  return (
    <div className="flex flex-col w-full justify-start">
      {listOfTasks.map((task: TaskInterface) => (
        <Task key={task.id} task={task} />
      ))}
    </div>
  );
}

export default ListOfTasks;
