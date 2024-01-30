"use client";
import React from "react";
import Task from "./Task/Task";
import { useListOfTasks } from "@/Contexts/ListOfTasksContext";
import { TaskModel } from "@/Interfaces/TaskInterface ";

function ListOfTasks() {
  const { listOfTasks } = useListOfTasks();
  return (
    <div className="h-[500px] overflow-y-auto flex flex-col w-full justify-start">
      {listOfTasks &&
        listOfTasks.map((task: TaskModel) => (
          <Task key={task.id} task={task} />
        ))}
    </div>
  );
}

export default ListOfTasks;
