"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaPlus } from "react-icons/fa";
import { MdOutlineLogout } from "react-icons/md";
import { FaRegFlag } from "react-icons/fa";
import { useModal } from "@/Contexts/AddCategoryToggle";
import { useSideMenuModal } from "@/Contexts/SideMenuToggle";
import ListOfCategories from "./ListOfCategory/ListOfCategory";
import { usePriority } from "@/Contexts/FiltrationContext";

function SideNav() {
  const { toggleModal } = useModal();
  const { isSideMenuVisible } = useSideMenuModal();
  const { setPriorityValue } = usePriority();

  const filterTasks = (newPriority: number) => {
    setPriorityValue(newPriority);
  };

  const handleButtonClick = () => {
    toggleModal();
  };
  return (
    <>
      {isSideMenuVisible && (
        <nav className="mt-10 w-96">
          <section className="flex flex-col justify-start  border-r-2 pl-8 mr-10">
            <header>
              <div className="mb-8">
                <h1 className="font-bold text-2xl">Your Tasks</h1>
                <p className="text-gray-400">Let's code this my man</p>
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
                <section className="mb-4">
                  <h1 className="text-xl font-bold text-black mb-3">Type</h1>
                  <hr className="w-40px"></hr>
                </section>
                <section>
                  <ListOfCategories />
                </section>
                <div>
                  <button
                    onClick={handleButtonClick}
                    className=" flex flex-row justify-start items-center mb-2 border text-black p-2 font-bold mt-7"
                  >
                    <FaPlus className=" mr-2" />
                    Add Category
                  </button>
                </div>
              </div>
            </section>

            <footer className="mt-9 ">
              <div className="flex flex-row justify-center items-center mb-2 border text-black  font-bold w-52">
                <section className="flex flex-row justify-between items-center  text-black p-1">
                  <div className="m-2">
                    <Avatar>
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="m-2">
                    <h2>Zaid Task</h2>
                    <h2 className="text-gray-400	">Role</h2>
                  </div>
                  <MdOutlineLogout className="m-2" />
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
