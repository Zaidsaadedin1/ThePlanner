"use client";
import { createContext, useContext, useState } from "react";

const SideMenuContext = createContext();

export const SideMenuProvider = ({ children }) => {
  const [isSideMenuVisible, setSideMenuVisible] = useState(false);

  const sideMenuToggle = () => {
    setSideMenuVisible(!isSideMenuVisible);
  };

  return (
    <SideMenuContext.Provider value={{ isSideMenuVisible, sideMenuToggle }}>
      {children}
    </SideMenuContext.Provider>
  );
};

export const useSideMenuModal = () => {
  const context = useContext(SideMenuContext);
  if (!context) {
    throw new Error("useSideMenuModal must be used within a SideMenuProvider");
  }
  return context;
};
