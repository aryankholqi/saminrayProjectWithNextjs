import React from "react";
import Link from "next/link";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import TelegramIcon from '@mui/icons-material/Telegram';

export default function Footer() {
  return (
    <>
      <hr className="w-1/2 text-black-300 mx-auto mt-20 mb-10" />
      <div className="container grid grid-cols-7 p-5">
        <div className="col-span-2">
          <h2 className="text-5xl text-primary mb-16">Veema</h2>
          <p className="text-sm font-medium">
            &copy;2023 - فروشگاه لباس، کیف و کفش{" "}
          </p>
          <p className="text-sm mt-2 font-medium">
            تمامی محصولات متعلق به ویما استایل است
          </p>
          <p className="ms-3 mt-1">
            <Link
              href="#"
              className="text-sm font-light hover:font-normal transition-all"
            >
              Terms of Services
            </Link>
            {" - "}
            <Link
              href="#"
              className="text-sm font-light hover:font-normal transition-all"
            >
              Privacy Policy
            </Link>
          </p>
        </div>
        <div>
          <Link href="/products" className="font-medium text-xl">
            محصولات
          </Link>
          <ul className="mt-5 flex flex-col gap-y-1">
            <li className="cursor-pointer">
              <KeyboardArrowLeftIcon />
              زنانه
            </li>
            <li className="cursor-pointer">
              <KeyboardArrowLeftIcon />
              مردانه
            </li>
            <li className="cursor-pointer">
              <KeyboardArrowLeftIcon />
              یونیسکس
            </li>
          </ul>
        </div>
        <div>
          <Link href="/about" className="font-medium text-xl">
            درباره ما
          </Link>
          <ul className="mt-5 flex flex-col gap-y-1">
            <li className="cursor-pointer">
              <KeyboardArrowLeftIcon />
              قوانین
            </li>
            <li className="cursor-pointer">
              <KeyboardArrowLeftIcon />
              شرایط پرداخت
            </li>
            <li className="cursor-pointer">
              <KeyboardArrowLeftIcon />
              نحوه ارسال
            </li>
          </ul>
        </div>
        <div>
          <Link href="/contact" className="font-medium text-xl">
            تماس با ما
          </Link>
          <ul className="mt-5 flex flex-col gap-y-1">
            <li className="cursor-pointer">
              <KeyboardArrowLeftIcon />
              نشانی
            </li>
            <li className="cursor-pointer">
              <KeyboardArrowLeftIcon />
              راه های ارتباطی
            </li>
          </ul>
        </div>
        <div className="col-span-2">
            <h2 className="font-semibold text-xl">ما رو توی فضای مجازی دنبال کن</h2>
            <p className="mt-5">منتظر پیشنهادای خوبت هستیم :)</p>
            <p className="flex gap-5 mt-6">
                <InstagramIcon className="cursor-pointer transition-all hover:-translate-y-1 hover:text-pink-700"/>
                <TwitterIcon className="cursor-pointer transition-all hover:-translate-y-1 hover:text-blue-900"/>
                <TelegramIcon className="cursor-pointer transition-all hover:-translate-y-1 hover:text-cyan-700"/>
            </p>
        </div>
      </div>
    </>
  );
}
