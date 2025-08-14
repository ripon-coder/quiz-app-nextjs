"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

const menuItems = [
  { name: "My Profile Information", path: "/user/profile" },
  { name: "My Quize Scores", path: "/user/quiz-scores" },
  { name: "Payment Request", path: "/user/payment-request" },
  { name: "Change Password", path: "/user/change-password" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="text-white w-full">
      <ul className="w-full">
        {menuItems.map((item) => (
          <li key={item.path}>
            <Link
              href={item.path}
              className={`w-full block py-2 pl-6 my-1 cursor-pointer hover:bg-black ${
                pathname === item.path ? "bg-black" : ""
              }`}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
