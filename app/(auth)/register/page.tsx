import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import RegisterComponent from "@/app/components/register";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register",
  description: "Create a new account on quizapp",
  keywords: ["register", "signup", "account", "myapp"],
};

export default async function RegisterPage() {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("authToken")?.value;
  if (authToken) {
    redirect("/");
  }
  return <RegisterComponent />;
}
