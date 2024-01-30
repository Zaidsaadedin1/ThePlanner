"use client";
import { useClerk, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { MdOutlineLogout } from "react-icons/md";

function NavBar() {
  const { isLoaded, user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();
  return (
    <>
      <nav className="flex flex-row justify-between h-14 items-center border-b-2 border-t-2">
        <div>
          <Link href="/home" className="text-2xl ml-1 font-bold font-mono">
            ThePlanner
          </Link>
        </div>
        <div className="flex flex-row justify-center items-center">
          {isLoaded && user ? (
            <>
              <div className="text-xl font-bold font-mono ">
                <Link href="/dashboard">Dashboard</Link>
              </div>
              <div className="ml-6 mr-4 text-xl font-bold">
                <Avatar>
                  <AvatarImage src={user?.imageUrl} alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
              <button
                className="w-8"
                onClick={() => signOut(() => router.push("/home"))}
              >
                <MdOutlineLogout className="size-5" />
              </button>
            </>
          ) : (
            <>
              <div className="text-xl font-bold">
                <Link href="/sign-up">Sign Up</Link>
              </div>
              <div className="ml-6 mr-1 text-xl font-bold">
                <Link href="/sign-in">Sign In</Link>
              </div>
            </>
          )}
        </div>
      </nav>
    </>
  );
}

export default NavBar;
