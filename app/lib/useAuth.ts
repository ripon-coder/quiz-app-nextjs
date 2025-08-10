"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return decodeURIComponent(parts.pop()!.split(";").shift()!);
  return null;
}

export function useAuth() {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkAuth = () => {
    const token = getCookie("authToken");
    setIsLoggedIn(!!token);
  };

  useEffect(() => {
    checkAuth();
  }, [pathname]);

  const logout = () => {
    document.cookie = `authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict`;
    setIsLoggedIn(false);
    router.push("/login");
  };

  return { isLoggedIn, logout, checkAuth };
}
