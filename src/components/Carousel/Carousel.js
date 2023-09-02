import React, { useState } from "react";
import slider1 from "public/images/home/slider1.jpg";
import slider2 from "public/images/home/slider2.jpg";
import slider3 from "public/images/home/slider3.jpg";
import Image from "next/image";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function Slider() {
  const sliders = [slider1, slider2, slider3];
  const [counter, setCounter] = useState(0);
  const prevSliderHandler = () => {
    if (counter === 0) {
      setCounter(sliders.length - 1);
    } else {
      setCounter((prev) => prev - 1);
    }
  };
  const nextSliderHandler = () => {
    if (counter === sliders.length - 1) {
      setCounter(0);
    } else {
      setCounter((prev) => prev + 1);
    }
  };
  return (
    <div className="grid grid-cols-1 w-2/3 mx-auto relative my-8 overflow-hidden">
      <ArrowForwardIosIcon
        className="absolute text-secondary-200 top-1/2 ms-5 p-1 rounded-xl bg-black-100 cursor-pointer transition-all hover:opacity-80"
        onClick={nextSliderHandler}
      />
      <Image src={sliders[counter]} alt="logo"/>
      <ArrowBackIosIcon
        className="absolute text-secondary-200 top-1/2 left-0 me-5 p-1 rounded-xl bg-black-100 cursor-pointer transition-all hover:opacity-80"
        onClick={prevSliderHandler}
      />
    </div>
  );
}
