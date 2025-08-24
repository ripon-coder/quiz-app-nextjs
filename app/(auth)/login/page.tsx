import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import LoginComponent from "@/app/components/login";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "login quizapp",
  keywords: ["register", "signup", "account", "myapp"],
};

export default async function RegisterPage() {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("authToken")?.value;
  if (authToken) {
    redirect("/");
  }
  return <LoginComponent />;
}
