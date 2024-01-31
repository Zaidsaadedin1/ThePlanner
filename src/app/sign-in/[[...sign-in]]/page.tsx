"use client";
import { SignIn } from "@clerk/nextjs";
import NavBar from "@/components/HomeDashBoard/NavBar/NavBar";
import { apis } from "@/Apis";
import { User } from "@/Interfaces/UserInterface";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
function SignInPage() {
  const { isLoaded, user, isSignedIn } = useUser();

  useEffect(() => {
    const fetchDataAndSaveToBackend = async () => {
      if (isLoaded && user && isSignedIn) {
        const newUser: User = {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.username,
          hasImage: user.hasImage,
          imageUrl: user.imageUrl,
        };
        try {
          const result = await apis.addNewUser(newUser);
        } catch (error) {
          console.error("Error saving user data:", error);
        }
      }
    };
    fetchDataAndSaveToBackend();
  }, [isLoaded, isSignedIn]);

  return (
    <>
      <div className="flex-col ">
        <NavBar />
        <div className="mt-8 justify-center flex ">
          <SignIn />
        </div>
      </div>
    </>
  );
}
export default SignInPage;
