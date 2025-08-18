import Link from "next/link";
import apple from "@/public/apple.png";
import google from "@/public/google1.png";
import Image from "next/image";
import { Facebook, Twitter, Youtube, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <>
      <div className="flex flex-col md:flex-row justify-center gap-4 bg-[#1a1c1d] py-8">
        <div className="md:w-1/4 text-white text-center">
          <h1 className="relative text-xl inline-block after:content-[''] after:block after:border-b-3 after:border-blue-500 after:w-[80%] after:mx-auto after:mt-2">
            About Us
          </h1>
          <ul className="text-sm pt-7">
            <Link href="/about-us">
              <li>About Us</li>
            </Link>
            <Link href="/terms-and-conditions">
              <li className="pt-3">Terms and Conditions</li>
            </Link>
            <Link href="/privacy-policy">
              <li className="pt-3">Privacy Policy</li>
            </Link>
          </ul>
        </div>

        <div className="md:w-1/4 text-white text-center mt-8 md:mt-0">
          <h1 className="relative text-xl inline-block after:content-[''] after:block after:border-b-3 after:border-blue-500 after:w-[80%] after:mx-auto after:mt-2">
            Help & support
          </h1>
          <ul className="text-sm pt-7 ">
            <Link href="/faq">
              <li className="">FAQ</li>
            </Link>
            <li className="pt-3">Contact Us</li>
            <li className="pt-3"></li>
          </ul>
        </div>
        <div className="md:w-1/4 text-white text-center mt-8 md:mt-0">
          <h1 className="relative text-xl inline-block after:content-[''] after:block after:border-b-3 after:border-blue-500 after:w-[80%] after:mx-auto after:mt-2">
            Quick Links
          </h1>
          <ul className="text-sm pt-7">
            <Link href={"/login"}>
              <li className="">Login</li>
            </Link>
            <Link href={"/register"}>
              <li className="pt-3">Register</li>
            </Link>
          </ul>
        </div>
        <div className="md:w-1/4 text-white text-center mt-8 md:mt-0">
          <h1 className="relative text-xl inline-block after:content-[''] after:block after:border-b-3 after:border-blue-500 after:w-[80%] after:mx-auto after:mt-2">
            Download Our App
          </h1>
          <div className="flex flex-row align-center justify-center gap-3">
            <Image
              src={apple}
              alt="Apple Store"
              className="w-32 h-10 mt-4 hover:scale-105 transition-transform duration-300 hover:cursor-pointer"
            />
            <Image
              src={google}
              alt="Apple Store"
              className="w-32 h-10 mt-4 hover:scale-105 transition-transform duration-300 hover:cursor-pointer"
            />
          </div>
          <h1 className="pt-4 relative text-xl inline-block after:content-[''] after:block after:border-b-3 after:border-blue-500 after:w-[80%] after:mx-auto after:mt-2">
            Follow Us On
          </h1>
          <div>
            <ul className="flex justify-center items-center gap-4 pt-4">
              <li className="rounded-full bg-blue-500 p-2 hover:bg-blue-600 transition-colors duration-300 hover:cursor-pointer">
                <Facebook className="w-4 h-4 text-white" />
              </li>
              <li className="rounded-full bg-blue-400 p-2  hover:bg-blue-600 transition-colors duration-300 hover:cursor-pointer">
                <Twitter className="w-4 h-4 text-white" />
              </li>
              <li className="rounded-full bg-red-500 p-2  hover:bg-blue-600 transition-colors duration-300 hover:cursor-pointer">
                <Youtube className="w-4 h-4 text-white" />
              </li>
              <li className="rounded-full bg-pink-500 p-2  hover:bg-blue-600 transition-colors duration-300 hover:cursor-pointer">
                <Instagram className="w-4 h-4 text-white" />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
