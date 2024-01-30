"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import ListOfTasks from "./ListOfTasks/ListOfTasks";
import AddTaskModal from "./ListOfTasks/Task/AddTask/AddTaskModal";
import AddCategory from "../SideNav/ListOfCategory/Category/AddCategory/AddModal";
import { useModal } from "../../../Contexts/TaskContextToggle";
import { useListOfTasks } from "@/Contexts/ListOfTasksContext";
import { useIsComplete, useMainHeader } from "@/Contexts/FiltrationContext";

function ContentSection() {
  const { toggleModal } = useModal();
  const { listOfTasks } = useListOfTasks();
  const { setIsCompleteValue, IsComplete } = useIsComplete();
  const { MainHeader } = useMainHeader();

  return (
    <>
      <AddCategory />
      <AddTaskModal />

      <main className="flex flex-col justify-start items-start p-5 w-full">
        <section className="flex flex-row justify-between items-center p-5 w-full">
          <div className="m-0 p-0">
            <h1 className="font-bold text-3xl ">{MainHeader}</h1>
          </div>
          <div>
            <Button
              onClick={() => {
                toggleModal();
              }}
              className="text-gray-200"
            >
              Add Task
            </Button>
            <Button
              onClick={() => {
                setIsCompleteValue(!IsComplete);
              }}
              className={`ml-7 ${
                IsComplete
                  ? "bg-red-700 text-white"
                  : "bg-white text-gray-600 hover:bg-white hover:text-black hover:border-zinc-950 hover:border-2"
              } active:bg-red-700 focus:outline-none`}
            >
              {IsComplete ? "Hide Completed Tasks" : "Show Completed Tasks"}
            </Button>
          </div>
        </section>

        <section className="w-full">
          {listOfTasks && listOfTasks.length === 0 ? (
            <p className="flex justify-center items-center text-6xl mt-40">
              There Is No Tasks Available
            </p>
          ) : (
            <ListOfTasks />
          )}
        </section>
      </main>
    </>
  );
}

export default ContentSection;
