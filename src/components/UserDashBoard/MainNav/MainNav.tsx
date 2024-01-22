"use client";
import { Input } from "@/components/ui/input";
import { MdOutlineMenu } from "react-icons/md";
import { CiSettings } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { useSideMenuModal } from "@/Contexts/SideMenuToggle";
function MainNav() {
  const { sideMenuToggle } = useSideMenuModal();

  const handleButtonClick = () => {
    sideMenuToggle();
  };
  return (
    <>
      <nav>
        <main className="flex flex-row justify-center items-center p-5 border-b-2">
          <button>
            <MdOutlineMenu
              onClick={handleButtonClick}
              className="text-gray-600 mr-1 w-10 size-7"
            />
          </button>
          <h3 className="text-center text-xl font-bold mr-1 w-48	">
            The Planner
          </h3>
          <Input
            type="search"
            placeholder="Search tasks..."
            className="rounded h-8 text-gray-500 outline-none "
          />
          <IoIosNotificationsOutline className="text-gray-600 ml-4 mr-4 w-10 size-7" />
          <CiSettings className="text-gray-600 mr-4 w-10 size-7" />
        </main>
      </nav>
    </>
  );
}
export default MainNav;
