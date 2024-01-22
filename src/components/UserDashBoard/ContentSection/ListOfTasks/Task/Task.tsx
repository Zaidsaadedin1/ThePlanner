"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { FaRegFlag } from "react-icons/fa";
import { TaskInterface } from "@/Interfaces/TaskInterface ";
import { formatDistanceToNow } from "date-fns";

function Task({ task }: { task: TaskInterface }) {
  const getPriorityColor = () => {
    switch (task.priority) {
      case 1:
        return "text-red-600";
      case 2:
        return "text-yellow-300";
      case 3:
        return "text-green-500";
      default:
        return "";
    }
  };

  const getDueDateLabel = () => {
    if (task.dueDate) {
      const distanceToNow = formatDistanceToNow(new Date(task.dueDate));
      return `Due ${distanceToNow}`;
    }
    return "Open Task";
  };

  return (
    <div className="w-12/12 border-2 m-3 p-4 rounded-md ">
      <div className="flex flex-row justify-between w-full">
        <section className="w-full">
          <div className="flex justify-between">
            <section>
              <h1 className="text-black-600 font-bold text-lg">{task.name}</h1>
            </section>
            <section className="flex flex-row items-center">
              <FaRegFlag
                className={`mr-3 text-black-600 size-4 ${getPriorityColor()}`}
              />
              <Badge variant="secondary">{getDueDateLabel()}</Badge>
            </section>
          </div>
          <h4 className="text-gray-500">{task.description}</h4>

          <section className="flex flex-row justify-start items-center">
            <div className="flex flex-row items-center">
              <Avatar className="mr-3 mt-3 size-7">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <div>
              <h4 className="text-gray-500 mt-2">Assigned to Zaid</h4>
            </div>
          </section>
        </section>
      </div>
    </div>
  );
}

export default Task;
