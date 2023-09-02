import React, { useState } from "react";
import Link from "next/link";
import { Avatar, IconButton, Badge } from "@mui/material";
import { useSession, signIn, signOut } from "next-auth/react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";
import { useGetCartProducts } from "@/src/querries/useCart";

export default function Navbar() {
  const { data: session } = useSession();

  const [isOpen, setIsOpen] = useState(false);

  const getCartProducts = useGetCartProducts();

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
        } w-1/2 md:w-1/3 h-full bg-tertiary absolute top-0 left-0 z-10`}
      >
        <ul>
          <Link href="/">
            <li className="p-2 text-lg font-medium text-secondary">
              صفحه اصلی
            </li>
          </Link>
          <Link href="/products">
            <li className="p-2 text-lg font-medium text-secondary">محصولات</li>
          </Link>
          <Link href="/profile">
            <li className="p-2 text-lg font-medium text-secondary">پروفایل</li>
          </Link>
          <Link href="/cart">
            <li className="p-2 text-lg font-medium text-secondary">سبد خرید</li>
          </Link>
          <Link href="/about">
            <li className="p-2 text-lg font-medium text-secondary">
              درباره ما
            </li>
          </Link>
          <Link href="/contact">
            <li className="p-2 text-lg font-medium text-secondary">
              تماس با ما
            </li>
          </Link>
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
                className="px-4 py-2 rounded-xl text-lg font-medium bg-black-300 text-secondary-100"
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
                className="px-4 py-2 rounded-xl text-lg font-medium bg-black-300 text-secondary-100"
              >
                ورود
              </button>
            </Link>
          )}
        </div>
      </div>
      <nav className="flex items-center p-4 justify-between md:justify-normal bg-tertiary">
        <h1 className="text-4xl md:text-5xl font-bold text-secondary cursor-pointer">
          <span className="text-tertiary-400">V</span>eema{" "}
          <span className="text-tertiary-400">S</span>tyle
        </h1>
        <ul className="ms-10 hidden lg:flex lg:gap-1">
          <Link href="/">
            <li className="p-2 transition-all text-lg font-medium text-secondary hover:text-black-300 hover:scale-110">
              صفحه اصلی
            </li>
          </Link>
          <Link href="/products">
            <li className="p-2 transition-all text-lg font-medium text-secondary hover:text-black-300 hover:scale-110">
              محصولات
            </li>
          </Link>
          <Link href="/about">
            <li className="p-2 transition-all text-lg font-medium text-secondary hover:text-black-300 hover:scale-110">
              درباره ما
            </li>
          </Link>
          <Link href="/contact">
            <li className="p-2 transition-all text-lg font-medium text-secondary hover:text-black-300 hover:scale-110">
              تماس با ما
            </li>
          </Link>
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
                  className="px-4 py-2 rounded-xl transition-all text-lg font-medium bg-black-300 text-secondary-100 hover:scale-110"
                >
                  ورود
                </button>
              </Link>
            </>
          )}
          <Link href="/cart">
            <IconButton className="text-black-400 hover:text-secondary-100 transition-all p-2.5 me-3">
              <Badge badgeContent={getCartProducts?.data?.length} className="p-1">
                <ShoppingCartIcon />
              </Badge>
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
                  className="px-4 py-2 rounded-xl transition-all text-lg font-medium bg-black-300 text-secondary-100 hover:scale-110"
                >
                  خروج
                </button>
              </Link>
              <Link href="/profile">
                <Avatar className="bg-primary-300 inline p-3 cursor-pointer">
                  {session?.user?.name.slice(0, 2)}
                </Avatar>
              </Link>
            </span>
          )}
        </div>
        <div
          className={`lg:hidden ms-5 z-10 text-black-400 transition-all ${
            isOpen ? "rotate-90" : ""
          }`}
        >
          <MenuIcon onClick={openMenuHandler} />
        </div>
      </nav>

      <hr className="text-tertiary mb-3" />
    </>
  );
}
