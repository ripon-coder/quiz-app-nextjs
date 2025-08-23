import ForgotPasswordComponent from "@/app/components/ForgotPassword";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password",
  description: "Forgot Password",
  keywords: ["register", "signup", "account", "myapp"],
};

export default function ForgotPassword(){
  return <ForgotPasswordComponent></ForgotPasswordComponent>
}