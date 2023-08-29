"use client";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";

export default function Header() {
  const { googleLogin, logout, currentUser } = useAuth();

  const [nav, setNav] = useState(false);

  function handleLogin() {
    return googleLogin();
  }

  function handleNav() {
    setNav(!nav);
  }

  return (
    <header className="flex md:flex-row flex-col justify-between px-5 py-3 items-center">
      <div
        className={`${
          nav ? "border-b-2 border-b-black" : ""
        } flex w-full justify-between `}
      >
        <Link href={"/"} className="text-2xl font-bold">
          SnapLoom
        </Link>

        <div onClick={handleNav} className="md:hidden">
          {nav ? <IoCloseOutline size={30} /> : <FiMenu size={25} />}
        </div>
      </div>

      <ul
        className={`${
          nav ? "flex flex-col w-full pt-5" : "hidden"
        } md:flex md:flex-row gap-5 items-center`}
      >
        <li className="md:border-none border-b w-full">
          <Link href={"/"}>About</Link>
        </li>
        <li className="md:border-none border-b w-full">
          <Link href={"/"}>Gallery</Link>
        </li>
        <li className="md:border-none border-b w-full">
          <Link href={"/"}>Contact</Link>
        </li>
        <li className="md:border-none border-b w-full">
          <Link href="/upload" className="bg-black text-white p-2">
            Upload
          </Link>
        </li>
        <li className="md:border-none border-b w-full">
          {currentUser && currentUser ? (
            <button className="bg-red-900 p-2 text-white" onClick={logout}>
              Logout
            </button>
          ) : (
            <button className="bg-black text-white p-2" onClick={handleLogin}>
              Sign/Signup
            </button>
          )}
        </li>
      </ul>
    </header>
  );
}
