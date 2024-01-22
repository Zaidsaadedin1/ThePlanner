import MainNav from "@/components/UserDashBoard/MainNav/MainNav";
import SideNav from "@/components/UserDashBoard/SideNav/SideNav";
import ContentSection from "@/components/UserDashBoard/ContentSection/ContentSection";
import { CategoryModalProvider } from "@/Contexts/AddCategoryToggle";
import { TaskModalProvider } from "@/Contexts/TaskContextToggle";
import { SideMenuProvider } from "@/Contexts/SideMenuToggle";
import { ListOfTasksProvider } from "@/Contexts/ListOfTasksContext";
import { FilterProvider } from "@/Contexts/FiltrationContext";

export default function Home() {
  return (
    <>
      <ListOfTasksProvider>
        <FilterProvider>
          <CategoryModalProvider>
            <SideMenuProvider>
              <MainNav />
              <div className="flex flex-row">
                <SideNav />
                <TaskModalProvider>
                  <ContentSection />
                </TaskModalProvider>
              </div>
            </SideMenuProvider>
          </CategoryModalProvider>
        </FilterProvider>
      </ListOfTasksProvider>
    </>
  );
}
