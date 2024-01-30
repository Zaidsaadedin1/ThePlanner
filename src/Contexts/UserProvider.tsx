import React, { createContext, useContext, useState, ReactNode } from "react";
import { apis } from "@/Apis";

interface UserData {
  id: string;
  firstName: string | null;
  lastName: string | null;
  username: string | null;
  hasImage: boolean;
  imageUrl: string;
}

interface UserContextProps {
  userData: UserData | null;
  setUserDataValues: () => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  // async function getUserData() {
  //   // Use your API call or any method to fetch user data
  //   try {
  //     const result = await apis.getUserData(); // Adjust the API call accordingly
  //     setUserData(result.data.user);
  //   } catch (error) {
  //     console.error("Error fetching user data:", error);
  //   }
  // }

  const [userData, setUserData] = useState<UserData | null>(null);

  const setUserDataValues = () => {
    //getUserData();
  };

  return (
    <UserContext.Provider value={{ userData, setUserDataValues }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
