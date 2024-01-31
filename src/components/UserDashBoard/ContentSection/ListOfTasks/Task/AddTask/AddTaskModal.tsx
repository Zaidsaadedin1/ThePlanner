"use client";

import React from "react";
import { useState, useEffect } from "react";
import { useModal } from "../../../../../../Contexts/TaskContextToggle";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

import { addDays, format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { apis } from "@/Apis";
import { AddTask } from "@/Interfaces/TaskInterface ";
import { useListOfTasks } from "@/Contexts/ListOfTasksContext";
import { useListOfCategories } from "@/Contexts/ListOfCategoryContext";
import { toast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";

function AddTaskModal() {
  const { getTasks } = useListOfTasks();

  const { isModalVisible, toggleModal } = useModal();
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [StartDate, setStartDate] = useState<Date | undefined>();
  const [DueDate, setDueDate] = useState<Date | undefined>();
  const [priority, setPriority] = useState<string | undefined>();
  const [isCompleted, setIsCompleted] = useState(false);
  const { listOfCategories } = useListOfCategories();

  const [nameError, setNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [priorityError, setPriorityError] = useState("");
  const [category, setCategory] = useState<number | undefined>();
  const [categoryError, setCategoryError] = useState("");
  const [DateError, setDateError] = useState<string>("");

  const resetFields = () => {
    setTaskName("");
    setNameError("");
    setDescription("");
    setDescriptionError("");
    setStartDate(undefined);
    setDueDate(undefined);
    setPriority(undefined);
    setPriorityError("");
    setCategory(undefined);
    setCategoryError("");
    setIsCompleted(false);
  };

  const addTask = async () => {
    if (!taskName) {
      setNameError("Task name cannot be empty");
      return;
    } else if (taskName.length > 20) {
      setNameError("Task Name cannot be longer than 20 characters");
      return;
    } else {
      setNameError("");
    }

    if (!description) {
      setDescriptionError("Description cannot be empty");
      return;
    } else if (description.length > 50) {
      setDescriptionError("Description cannot be longer than 100 characters");
      return;
    } else {
      setDescriptionError("");
    }

    if (!priority) {
      setPriorityError("Priority cannot be empty");
      return;
    } else {
      setPriorityError("");
    }

    if (DueDate && StartDate && DueDate.getTime() < StartDate.getTime()) {
      setDateError("DueDate should be set after StartDate");
      return;
    } else {
      setDateError("");
    }

    if (!category) {
      setCategoryError("Category cannot be empty");
      return;
    } else {
      setCategoryError("");
    }

    const taskData: AddTask = {
      name: taskName,
      description,
      priority: parseInt(priority),
      createdAt: new Date().toISOString(),
      startDate: StartDate?.toISOString(),
      dueDate: DueDate?.toISOString(),
      isCompleted,
      categoryId: category,
    };

    try {
      const result = await apis.addTask(taskData);
      if (result.status === 200) {
        getTasks();
        toggleModal();
        resetFields();
        toast({
          title: "Task Added Successfully",
          description: "Your New Task Has Been Added.",
        });
      }
    } catch (error) {
      toast({
        title: "Task Cant Be Added ",
        description: "Task Cant Be Added Something Wrong Happened",
      });
    }
  };

  return (
    <>
      <Toaster />

      <Dialog
        open={isModalVisible}
        modal={true}
        onOpenChange={() => {
          toggleModal;
        }}
      >
        <DialogContent>
          <DialogHeader>
            <header className="mb-4">
              <h1 className="text-2xl font-bold">ADD TASK</h1>
            </header>
          </DialogHeader>

          <div className="mb-6 flex flex-col">
            <Label className="mb-2">Task Name</Label>
            <Input
              className=" outline-0"
              placeholder="Add Task Name.."
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />
            <Label className="text-red-500  mb-2 mt-2">{nameError}</Label>

            <Label className="mb-2">Description</Label>
            <Textarea
              className="outline-none max-"
              placeholder="Add description to your task..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Label className="text-red-500  mb-2 mt-2">
              {descriptionError}
            </Label>

            <div className="mb-4 flex flex-col w-full">
              <Label className="mb-2 w-full">Start At</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[240px] justify-start text-left font-normal",
                      !StartDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {StartDate ? (
                      format(StartDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  align="start"
                  className="flex w-auto flex-col space-y-2 p-2"
                >
                  <Select
                    onValueChange={(value) =>
                      setStartDate(addDays(new Date(), parseInt(value)))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="0">Today</SelectItem>
                      <SelectItem value="1">Tomorrow</SelectItem>
                      <SelectItem value="3">In 3 days</SelectItem>
                      <SelectItem value="7">In a week</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="rounded-md border">
                    <Calendar
                      mode="single"
                      selected={StartDate}
                      onSelect={setStartDate}
                    />
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            <div className="mb-4 flex flex-col w-full">
              <Label className="mb-2">Due Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[240px] justify-start text-left font-normal",
                      !DueDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {DueDate ? (
                      format(DueDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  align="start"
                  className="flex w-auto flex-col space-y-2 p-2"
                >
                  <Select
                    onValueChange={(value) =>
                      setDueDate(addDays(new Date(), parseInt(value)))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="0">Today</SelectItem>
                      <SelectItem value="1">Tomorrow</SelectItem>
                      <SelectItem value="3">In 3 days</SelectItem>
                      <SelectItem value="7">In a week</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="rounded-md border">
                    <Calendar
                      mode="single"
                      selected={DueDate}
                      onSelect={setDueDate}
                    />
                  </div>
                </PopoverContent>
              </Popover>
              <Label className="text-red-500  mb-2 mt-2">{DateError}</Label>
            </div>

            <div className="mb-4">
              <Select onValueChange={(value) => setPriority(value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Priority</SelectLabel>
                    <SelectItem value="1">High</SelectItem>
                    <SelectItem value="2">Medium</SelectItem>
                    <SelectItem value="3">Low</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Label className="text-red-500  mb-2 mt-2">{priorityError}</Label>
            </div>

            <div className="mb-4">
              <Select onValueChange={(value) => setCategory(parseInt(value))}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a Category" />
                </SelectTrigger>
                <SelectContent position="popper">
                  {listOfCategories.map((category, index) => (
                    <SelectItem key={index} value={category.id.toString()}>
                      {category.categoryName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Label className="text-red-500 mb-3">{categoryError}</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="Completed-check"
                checked={isCompleted}
                onCheckedChange={() => setIsCompleted(!isCompleted)}
              />
              <Label htmlFor="airplane-mode">Completed</Label>
            </div>
          </div>

          <DialogFooter className="flex justify-center mb-4 mt-4">
            <Button
              className={`w-28 bg-white px-4 py-2 rounded border  text-black-300 hover:border-black hover:border-2 hover:bg-white ml-2`}
              onClick={toggleModal}
            >
              Cancel
            </Button>
            <Button
              className={`w-28 text-gray-300 px-4 py-2 rounded border border-gray-200 bg-black`}
              onClick={() => {
                addTask();
              }}
            >
              Add
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AddTaskModal;
