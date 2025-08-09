"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import logo from "@/public/logo.png";

const MENU_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/ongoing", label: "Ongoing Quizzes" },
  { href: "/services", label: "Upcoming Quizzes" },
  { href: "/register", label: "Register" },
  { href: "/login", label: "Login" },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image src={logo} alt="quiz" />
          {/* <span className="ml-2 text-2xl font-bold">Quiz</span> */}
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
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
