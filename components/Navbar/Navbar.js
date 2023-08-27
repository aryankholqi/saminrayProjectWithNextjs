import React, { useState } from "react";
import Link from "next/link";
import { Avatar, IconButton } from "@mui/material";
import { useSession, signIn, signOut } from "next-auth/react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";

export default function Navbar() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const openMenuHandler = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <div
        className={`${
          isOpen
            ? "flex justify-center flex-col gap-20 items-center lg:hidden"
            : "hidden"
        } w-1/2 md:w-1/3 h-full bg-primary absolute top-0 left-0 z-10`}
      >
        <ul>
          <li className="p-2 rounded-xl transition-all text-lg font-medium text-white">
            <Link href="/">صفحه اصلی</Link>
          </li>
          <li className="p-2 rounded-xl transition-all text-lg font-medium text-white">
            <Link href="/products">محصولات</Link>
          </li>
          <li className="p-2 rounded-xl transition-all text-lg font-medium text-white md:hidden">
            <Link href="/profile">پروفایل</Link>
          </li>
          <li className="p-2 rounded-xl transition-all text-lg font-medium text-white md:hidden">
            <Link href="/cart">سبد خرید</Link>
          </li>
          <li className="p-2 rounded-xl transition-all text-lg font-medium text-white">
            <Link href="/about">درباره ما</Link>
          </li>
          <li className="p-2 rounded-xl transition-all text-lg font-medium text-white">
            <Link href="/contact">تماس با ما</Link>
          </li>
        </ul>
        <div className="md:hidden">
          {session ? (
            <Link
              href="/api/auth/signout"
              className="me-3"
              onClick={(e) => {
                e.preventDefault();
                signOut();
              }}
            >
              <button
                type="button"
                className="bg-black text-white px-5 py-3 rounded-xl text-xl hover:opacity-90"
              >
                خروج
              </button>
            </Link>
          ) : (
            <Link
              href="/api/auth/signin"
              className="me-3"
              onClick={(e) => {
                e.preventDefault();
                signIn();
              }}
            >
              <button
                type="button"
                className="bg-black text-white px-5 py-3 rounded-xl text-xl hover:opacity-90"
              >
                ورود
              </button>
            </Link>
          )}
        </div>
      </div>
      <nav className="flex items-center p-4 justify-between md:justify-normal">
        <h1 className="text-3xl md:text-5xl font-bold text-tertiary cursor-pointer">
          Veema Style
        </h1>
        <ul className="ms-10 hidden lg:flex lg:gap-1">
          <li className="p-2 rounded-xl transition-all text-lg font-medium hover:bg-primary hover:text-white">
            <Link href="/">صفحه اصلی</Link>
          </li>
          <li className="p-2 rounded-xl transition-all text-lg font-medium hover:bg-primary hover:text-white">
            <Link href="/products">
              محصولات
            </Link>
          </li>
          <li className="p-2 rounded-xl transition-all text-lg font-medium hover:bg-primary hover:text-white">
            <Link href="/about">درباره ما</Link>
          </li>
          <li className="p-2 rounded-xl transition-all text-lg font-medium hover:bg-primary hover:text-white">
            <Link href="/contact">تماس با ما</Link>
          </li>
        </ul>
        <div className="ms-auto hidden md:block">
          {!session && (
            <>
              <Link
                href="/api/auth/signin"
                className="me-3"
                onClick={(e) => {
                  e.preventDefault();
                  signIn();
                }}
              >
                <button
                  type="button"
                  className="bg-black text-white px-5 py-3 rounded-xl text-xl hover:opacity-90"
                >
                  ورود
                </button>
              </Link>
            </>
          )}
          <Link href="/cart">
            <IconButton className="text-black p-4 me-3">
              <ShoppingCartIcon />
            </IconButton>
          </Link>
          {session && (
            <span>
              <Link
                href="/api/auth/signout"
                className="me-3"
                onClick={(e) => {
                  e.preventDefault();
                  signOut();
                }}
              >
                <button
                  type="button"
                  className="bg-black text-white px-5 py-3 rounded-xl text-xl hover:opacity-90"
                >
                  خروج
                </button>
              </Link>
              <Link href="/profile">
                <Avatar className="bg-tertiary inline p-4 cursor-pointer">
                  {session?.user?.name.slice(0, 2)}
                </Avatar>
              </Link>
            </span>
          )}
        </div>
        <div
          className={`lg:hidden ms-5 z-10 ${
            isOpen ? "rotate-90 text-white" : ""
          }`}
        >
          <MenuIcon onClick={openMenuHandler} />
        </div>
      </nav>

      <hr className="text-tertiary mb-3" />
    </>
  );
}
