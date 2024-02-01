"use client";
import { TaskModel, UpdateTask } from "@/Interfaces/TaskInterface ";
import { useEffect, useState } from "react";
import { apis } from "@/Apis";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { addDays, format } from "date-fns";
import { cn } from "@/lib/utils";
import { FaPenAlt } from "react-icons/fa";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  DialogHeader,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Popover } from "@radix-ui/react-popover";
import { useListOfCategories } from "@/Contexts/ListOfCategoryContext";
import { toast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { useResetFilters } from "@/Contexts/FiltrationContext";

function EditTask({ task }: { task: TaskModel }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [StartDate, setStartDate] = useState<Date | undefined>();
  const [DueDate, setDueDate] = useState<Date | undefined>();
  const [priority, setPriority] = useState<string | undefined>();
  const [categoryName, setCategoryName] = useState<string>();
  const [isCompleted, setIsCompleted] = useState(false);
  const [categoryID, setCategoryId] = useState<number>(task.categoryId);
  const [assignments, setAssignments] = useState<TaskModel[]>([]);

  const [nameError, setNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [priorityError, setPriorityError] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [DateError, setDateError] = useState<string>("");

  const { listOfCategories } = useListOfCategories();
  const initialFiltration = useResetFilters();

  useEffect(() => {
    const getCategoryName = async (categoryID: number) => {
      try {
        const categoryResult = await apis.getCategory(categoryID);
        const result = categoryResult.categoryName;
        setCategoryName(result);
      } catch (error) {
        console.error("Error fetching category:", error);
      }
    };
    getCategoryName(task.categoryId);
  }, []);

  const fillEditTaskFields = () => {
    setTaskName(task.name);
    setDescription(task.description || "");
    setStartDate(task.startDate ? new Date(task.startDate) : undefined);
    setDueDate(task.dueDate ? new Date(task.dueDate) : undefined);
    setPriority(task.priority.toString());
    setIsCompleted(task.isCompleted);
  };
  const checkForTasksName = async () => {
    try {
      const result = await apis.getAllTasks();
      const assignments = result.data.assignments;

      const duplicateTask = assignments.find(
        (assignment: TaskModel) =>
          assignment.name === taskName && assignment.id != task.id
      );

      if (duplicateTask) {
        toast({
          title: "Task Can't be Updated",
          description: "There is already a task with this name.",
        });
        return true;
      }
    } catch (error) {
      console.error("Error checking for task name:", error);
    }

    return false;
  };

  const isTaskDataChanged = () => {
    if (
      taskName == task.name &&
      description == task.description &&
      priority == task.priority.toString() &&
      categoryID == task.categoryId &&
      StartDate == task.startDate &&
      DueDate == task.dueDate &&
      isCompleted == task.isCompleted
    ) {
      return true;
    }
    return false;
  };
  const updateTask = async () => {
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

    if (!categoryName) {
      setCategoryError("Category cannot be empty");
      return;
    } else {
      setCategoryError("");
    }
    if (await checkForTasksName()) {
      return;
    }

    const updateAssignment: UpdateTask = {
      name: taskName,
      description,
      priority: parseInt(priority),
      startDate: StartDate?.toISOString(),
      dueDate: DueDate?.toISOString(),
      isCompleted,
      categoryId: categoryID,
    };

    try {
      const result = await apis.updateTask(updateAssignment, task.id);
      setIsDrawerOpen(!isDrawerOpen);
      initialFiltration();
      if (result.status === 200) {
        toast({
          title: "Task Updated Successfully",
          description: "Your New Task Has Been Updated.",
        });
      }
    } catch (error) {
      toast({
        title: "Task Cant Be Updated ",
        description: "Task Cant Be Updated Something Wrong Happened",
      });
    }
  };
  return (
    <>
      <Toaster />
      <Dialog open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DialogTrigger asChild>
          <Button
            onClick={fillEditTaskFields}
            variant="outline"
            className="bg-black text-white"
          >
            <FaPenAlt />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader className="text-left">
            <DialogTitle>Edit Task</DialogTitle>
            <DialogDescription>Make changes to your Task...</DialogDescription>
          </DialogHeader>
          <div className="mb-6 flex flex-col">
            <Label className="mb-2">Task Name</Label>
            <Input
              className=" outline-0"
              placeholder="Add Task Name.."
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />
            <Label className="text-red-500 mb-2 mt-2">{nameError}</Label>

            <Label className="mb-2">Description</Label>
            <Textarea
              className="outline-none"
              placeholder="Add description to your task..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Label className="text-red-500 mb-2 mt-2">{descriptionError}</Label>

            <div className="mb-4 flex flex-col w-full">
              <Label className="mb-2 w-full">Start At</Label>
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
              <Label className="text-red-500 mb-2 mt-2">{DateError}</Label>
            </div>

            <div className="mb-4">
              <Select
                value={priority}
                onValueChange={(value) => setPriority(value)}
              >
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
              <Label className="text-red-500 mb-2 mt-2">{priorityError}</Label>
            </div>

            <div className="mb-4">
              <Select
                value={categoryName}
                onValueChange={(value) => {
                  const selectedCategory = listOfCategories.find(
                    (category) => category.id.toString() === value
                  );
                  if (selectedCategory) {
                    setCategoryName(selectedCategory.categoryName);
                    setCategoryId(selectedCategory.id);
                  }
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a Category">
                    {categoryName ? categoryName : "Select a Category"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent position="popper">
                  {listOfCategories &&
                    listOfCategories.map((category, index) => (
                      <SelectItem key={index} value={category.id.toString()}>
                        {category.categoryName}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <Label className="text-red-500 mb-2 mt-2">{categoryError}</Label>
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
          <DialogFooter>
            {!isTaskDataChanged() && (
              <Button
                onClick={() => {
                  updateTask();
                }}
                variant="outline"
              >
                Save Changes
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
export default EditTask;
