"use client";
import React, { createContext, useContext, useState } from "react";

const CategoryModalContext = createContext();

export const CategoryModalProvider = ({ children }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <CategoryModalContext.Provider value={{ isModalVisible, toggleModal }}>
      {children}
    </CategoryModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(CategoryModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
