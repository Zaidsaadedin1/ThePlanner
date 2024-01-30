"use client";
import MainNav from "@/components/UserDashBoard/MainNav/MainNav";
import SideNav from "@/components/UserDashBoard/SideNav/SideNav";
import ContentSection from "@/components/UserDashBoard/ContentSection/ContentSection";
import { CategoryModalProvider } from "@/Contexts/AddCategoryToggle";
import { TaskModalProvider } from "@/Contexts/TaskContextToggle";
import { SideMenuProvider } from "@/Contexts/SideMenuToggle";
import { ListOfTasksProvider } from "@/Contexts/ListOfTasksContext";
import { FilterProvider } from "@/Contexts/FiltrationContext";
import { ListOfCategoriesProvider } from "@/Contexts/ListOfCategoryContext";
import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default function Home() {
  const { isLoaded, user } = useUser();

  if (!isLoaded || !user) {
    redirect("/home");
  }

  return (
    <>
      {isLoaded && user && (
        <ListOfTasksProvider>
          <FilterProvider>
            <CategoryModalProvider>
              <ListOfCategoriesProvider>
                <SideMenuProvider>
                  <MainNav />
                  <div className="flex flex-row">
                    <SideNav />
                    <TaskModalProvider>
                      <ContentSection />
                    </TaskModalProvider>
                  </div>
                </SideMenuProvider>
              </ListOfCategoriesProvider>
            </CategoryModalProvider>
          </FilterProvider>
        </ListOfTasksProvider>
      )}
    </>
  );
}
