"use client";
import React, { createContext, useContext, useState } from "react";

const TaskModelContext = createContext();

export const TaskModalProvider = ({ children }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <TaskModelContext.Provider value={{ isModalVisible, toggleModal }}>
      {children}
    </TaskModelContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(TaskModelContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
