"use client";
import { FaPlus } from "react-icons/fa";
import { FaRegFlag } from "react-icons/fa";
import { useModal } from "@/Contexts/AddCategoryToggle";
import { useSideMenuModal } from "@/Contexts/SideMenuToggle";
import ListOfCategories from "./ListOfCategory/ListOfCategory";
import {
  useMainHeader,
  usePriority,
  useResetFilters,
} from "@/Contexts/FiltrationContext";
import { useListOfCategories } from "@/Contexts/ListOfCategoryContext";
import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import DeleteCategory from "./ListOfCategory/Category/DeleteCategory/DeleteCategory";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SiTask } from "react-icons/si";
import { useListOfTasks } from "@/Contexts/ListOfTasksContext";
import { useRouter } from "next/navigation";
import { MdOutlineLogout } from "react-icons/md";

function SideNav() {
  const { getTasks } = useListOfTasks();
  const { user } = useUser();
  const { toggleModal, isModalVisible } = useModal();
  const { isSideMenuVisible } = useSideMenuModal();
  const { setPriorityValue } = usePriority();
  const { setListOfCategoriesValues } = useListOfCategories();
  const { setMainHeaderValue } = useMainHeader();
  const resetFilters = useResetFilters();

  const router = useRouter();

  const filterTasks = (newPriority: number) => {
    setPriorityValue(newPriority);
  };

  useEffect(() => {
    setListOfCategoriesValues();
  });

  const handleButtonClick = () => {
    toggleModal();
  };
  return (
    <>
      {isSideMenuVisible && (
        <nav className="mt-10 w-96 mr-0">
          <section className="flex flex-col justify-start  border-r-2 pl-8 mr-">
            <header>
              <div className="mb-1">
                <h1 className="font-bold text-2xl">Your Tasks</h1>
              </div>
              <div>
                <button
                  onClick={() => {
                    getTasks();
                    setMainHeaderValue("All Tasks");
                    resetFilters();
                  }}
                  className="w-[200px ] flex flex-row justify-start items-center bg-white font-bold text-red-600 hover:bg-white hover:text-green-400  "
                >
                  <SiTask className="mr-1" />
                  Show All Tasks
                </button>
              </div>
            </header>
            <section>
              <div>
                <section>
                  <h1 className="font-bold text-xl text-black mb-2">
                    Priority
                  </h1>
                  <hr className="w-36"></hr>
                </section>

                <section className="flex flex-col justify-start items-start mb-5 ">
                  <button
                    onClick={() => filterTasks(1)}
                    className="flex flex-row justify-center items-center mb-2 mt-2"
                  >
                    <FaRegFlag className="text-red-500 mr-3  size-4" />
                    <h1 className="text-base font-bold text-black">
                      High Priority
                    </h1>
                  </button>
                  <button
                    onClick={() => filterTasks(2)}
                    className="flex flex-row justify-center items-center mb-2 "
                  >
                    <FaRegFlag className="text-yellow-300 mr-3 size-4" />
                    <h1 className="text-base font-bold text-black">
                      Medium Priority
                    </h1>
                  </button>
                  <button
                    onClick={() => filterTasks(3)}
                    className="flex flex-row justify-center items-center mb-2"
                  >
                    <FaRegFlag className="text-green-500 mr-3  size-4" />
                    <h1 className="text-base font-bold text-black">
                      Low Priority
                    </h1>
                  </button>
                </section>
              </div>

              <div>
                <section className="mb-2">
                  <h1 className="text-xl font-bold text-black mb-3">
                    Categories
                  </h1>
                  <hr className="w-40px"></hr>
                </section>
                <section>
                  <ListOfCategories />
                </section>
                <div className=" flex justify-start  items-start flex-col">
                  <Button
                    onClick={handleButtonClick}
                    className="  flex flex-row border-2 justify-start hover:bg-white hover:text-black-950 hover:border-black hover:border-2  items-center mb-1  text-black   mt-6 bg-white "
                  >
                    <FaPlus className=" mr-2" />
                    Add Category
                  </Button>
                </div>
              </div>
            </section>

            <footer className="mt-10 ">
              <div className="flex flex-row justify-center items-center mb-2 border text-black  font-bold w-52">
                <section className="flex flex-row justify-between items-center  text-black p-1">
                  <div className="m-2">
                    <Avatar>
                      <AvatarImage src={user?.imageUrl} alt="@shadcn" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="m-2">
                    <h2>{user?.username}</h2>
                    <h2 className="text-gray-400">Admin</h2>
                  </div>
                  <div className="m-2">
                    <button onClick={() => router.push("/home")}>
                      <MdOutlineLogout />
                    </button>
                  </div>
                </section>
              </div>
            </footer>
          </section>
        </nav>
      )}
    </>
  );
}
export default SideNav;
