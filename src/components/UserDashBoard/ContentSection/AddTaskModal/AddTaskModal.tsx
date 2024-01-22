"use client";

import React from "react";
import { useState, useEffect } from "react";
import { useModal } from "../../../../Contexts/TaskContextToggle";
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

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { apis } from "@/Apis";

interface CategoryData {
  id: number;
  categoryName: string;
}

function AddTaskModal() {
  const { isModalVisible, toggleModal } = useModal();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [StartDate, setStartDate] = useState<Date | undefined>();
  const [DueDate, setDueDate] = useState<Date | undefined>();
  const [priority, setPriority] = useState<string | undefined>();
  const [category, setCategory] = useState<string | undefined>();
  const [isCompleted, setIsCompleted] = useState(false);

  const [listOfCategories, setListOfCategories] = useState<CategoryData[]>([]);

  useEffect(() => {
    getAllCategories();
  }, []);

  async function getAllCategories() {
    try {
      const result = await apis.getALLCategories();
      setListOfCategories(result.data.categories);
      console.log(result);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  const addTask = async () => {
    const taskData = {
      name,
      description,
      priority: priority ? parseInt(priority) : 0,
      createdAt: new Date().toISOString(),
      startDate: StartDate?.toISOString(),
      dueDate: DueDate?.toISOString(),
      isCompleted,
      categoryId: category ? parseInt(category) : 0,
    };
    const result = await apis.addTask(taskData);
    if (result.status === 200) {
      console.log(result.data.message);
    }
  };

  return (
    <Dialog open={isModalVisible}>
      <DialogContent>
        <DialogHeader>
          <header className="mb-4">
            <h1 className="text-2xl font-bold">Add Task</h1>
          </header>
        </DialogHeader>

        <div className="mb-6 flex flex-col">
          <Label className="mb-2">Name</Label>

          <Input
            className="mb-4 outline-0"
            placeholder="Task Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Label className="mb-2">Description</Label>
          <Textarea
            className="mb-4 outline-none"
            placeholder="Add description to your task..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

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
                  {DueDate ? format(DueDate, "PPP") : <span>Pick a date</span>}
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
          </div>

          <div className="mb-4">
            <Select onValueChange={(value) => setCategory(value)}>
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

        <footer className="flex justify-center mb-4 mt-4">
          <Button
            className={`text-gray-300 px-4 py-2 rounded border border-gray-200 bg-black`}
            onClick={() => {
              addTask();
            }}
          >
            Add
          </Button>
          <Button
            className={`bg-black px-4 py-2 rounded border border-gray-200 text-gray-300 ml-2`}
            onClick={toggleModal}
          >
            Cancel
          </Button>
        </footer>
      </DialogContent>
    </Dialog>
  );
}

export default AddTaskModal;
