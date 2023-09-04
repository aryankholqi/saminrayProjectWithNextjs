import React from "react";
import img1 from "public/images/home/1.jpeg";
import img2 from "public/images/home/2.jpg";
import img3 from "public/images/home/3.jpg";
import Image from "next/image";
import MoodIcon from "@mui/icons-material/Mood";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import Slider from "@/src/components/Carousel/Carousel";

export default function Home() {
  return (
    <div className="container mt-10">
      <div className="columns-1 sm:columns-2 md:columns-2 lg:columns-3">
        <div>
          <div className="columns-2 lg:columns-1">
            <Image
              alt="logo"
              src={img2}
              className="transition-all hover:scale-105"
              priority
            />
            <Image
              alt="logo"
              src={img3}
              className="transition-all hover:scale-105"
              priority
            />
          </div>
          <div className="mt-3">
            <Image
              alt="logo"
              src={img1}
              className="transition-all hover:scale-105"
              priority
            />
          </div>
        </div>
        <div className="text-center mt-5">
          <h1 className="text-xl sm:text-2xl md:text-4xl font-bold text-black-300">
            <span className="text-tertiary-400">V</span>
            <br />E<br />E<br />M<br />A<p>ــــــــــــــــــــ</p>
            <br />
            <span className="text-tertiary-400">S</span>
            <br />T<br />Y<br />L<br />E
          </h1>
        </div>
      </div>
      <section className="mt-28">
        <div className="columns-3 gap-x-3">
          <div className="text-center">
            <p className="text-md md:text-2xl font-bold">
              <MoodIcon className="text-3xl text-primary" /> رضایت مشتری
            </p>
            <span className="font-normal text-2xl">83</span>
          </div>
          <div className="text-center">
            <p className="text-md md:text-2xl font-bold">
              <ThumbUpOffAltIcon className="text-3xl text-primary" /> رضایت
              مشتری
            </p>
            <span className="font-normal text-2xl">83</span>
          </div>
          <div className="text-center">
            <p className="text-md md:text-2xl font-bold">
              <CheckroomIcon className="text-3xl text-primary" /> رضایت مشتری
            </p>
            <span className="font-normal text-2xl">83</span>
          </div>
        </div>
      </section>
      <section className="mt-16">
        <p className={`text-xl font-normal text-center`}>
          اینا محبوب ترینان. با ویـــمایی ها موافقی؟
        </p>
        <Slider />
      </section>
    </div>
  );
}
