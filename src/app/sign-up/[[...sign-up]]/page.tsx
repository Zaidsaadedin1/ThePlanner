"use client";
import NavBar from "@/components/HomeDashBoard/NavBar/NavBar";
import { SignUp } from "@clerk/nextjs";

function SignUpPage() {
  return (
    <>
      <div className="flex-col ">
        <NavBar />
        <div className="mt-2 justify-center flex ">
          <SignUp />
        </div>
      </div>
    </>
  );
}
export default SignUpPage;
