"use client";
import { redirect } from "next/navigation";

function NotFoundPage() {
  redirect("/home");
}
export default NotFoundPage;
