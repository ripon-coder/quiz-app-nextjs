import RegisterComponent from "@/app/components/register";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register",
  description: "Create a new account on quizapp",
  keywords: ["register", "signup", "account", "myapp"],
};

export default function RegisterPage() {
  return <RegisterComponent />;
}
