"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import logo from "@/public/logo.png";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/lib/useAuth";

const MENU_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/ongoing-quizzes", label: "Ongoing Quizzes" },
  { href: "/upcoming-quizzes", label: "Upcoming Quizzes" },
];

const Navbar: React.FC = () => {
  const { isLoggedIn, logout } = useAuth();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  function handleLogout() {
    logout();
    router.push("/login");
  }

  return (
    <nav className="bg-gray-900 text-white">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image src={logo} alt="quiz" />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6">
          {MENU_ITEMS.map(({ href, label }) => (
            <li key={href}>
              <Link href={href} className="hover:text-gray-300">
                {label}
              </Link>
            </li>
          ))}

          {!isLoggedIn ? (
            <>
              <li>
                <Link href="/register" className="hover:text-gray-300">
                  Register
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-gray-300">
                  Login
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/user/profile" className="hover:text-gray-300">
                  Profile
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="hover:text-gray-300 cursor-pointer bg-transparent border-none"
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden focus:outline-none cursor-pointer"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="relative">
          <ul className="md:hidden flex flex-col bg-gray-800 z-50 absolute top-full left-0 right-0">
            {MENU_ITEMS.map(({ href, label }) => (
              <li key={href} className="w-full">
                <Link
                  href={href}
                  className="block w-full px-6 py-4 hover:bg-gray-700 hover:text-gray-300"
                  onClick={() => setIsOpen(false)}
                >
                  {label}
                </Link>
              </li>
            ))}

            {!isLoggedIn ? (
              <>
                <li className="w-full">
                  <Link
                    href="/register"
                    className="block w-full px-6 py-4 hover:bg-gray-700 hover:text-gray-300"
                    onClick={() => setIsOpen(false)}
                  >
                    Register
                  </Link>
                </li>
                <li className="w-full">
                  <Link
                    href="/login"
                    className="block w-full px-6 py-4 hover:bg-gray-700 hover:text-gray-300"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="w-full">
                  <Link
                    href="/user/profile"
                    className="block w-full px-6 py-4 hover:bg-gray-700 hover:text-gray-300"
                    onClick={() => setIsOpen(false)}
                  >
                    Profile
                  </Link>
                </li>
                <li className="w-full">
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="w-full text-left px-6 py-4 hover:bg-gray-700 hover:text-gray-300 bg-transparent border-none"
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
