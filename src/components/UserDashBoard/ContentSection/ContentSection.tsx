"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import ListOfTasks from "./ListOfTasks/ListOfTasks";
import AddTaskModal from "./AddTaskModal/AddTaskModal";
import CategoryModal from "../SideNav/CategoryModal/CategoryModal";
import { useModal } from "../../../Contexts/TaskContextToggle";
import { useListOfTasks } from "@/Contexts/ListOfTasksContext";
import { useIsComplete, useMainHeader } from "@/Contexts/FiltrationContext";

function ContentSection() {
  const { toggleModal } = useModal();
  const { listOfTasks } = useListOfTasks();
  const { setIsCompleteValue, IsComplete } = useIsComplete();
  const { MainHeader } = useMainHeader();

  const toggleIsCompleteButton = () => {
    setIsCompleteValue(IsComplete);
  };

  return (
    <>
      <AddTaskModal />
      <CategoryModal />

      <main className="flex flex-col justify-start items-start p-5 w-full">
        <section className="flex flex-row justify-between items-center p-5 w-full">
          <div className="m-0 p-0">
            <h1 className="font-bold text-3xl ">{MainHeader}</h1>
            <h4 className="text-s text-gray-500">
              Complete these tasks as soon as possible.
            </h4>
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
                toggleIsCompleteButton();
              }}
              className="ml-7 text-gray-200 hover:bg-violet-600 active:bg-red-700 focus:outline-none focus:ring focus:ring-gray-300"
            >
              Show Completed Tasks
            </Button>
          </div>
        </section>

        <section className="w-full">
          {listOfTasks.length === 0 ? (
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
