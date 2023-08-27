import { getPopularProducts } from "@/api/products";
import React, { useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function Home({ popularProducts }) {
  const [counter, setCounter] = useState(0);
  const nextProductchange = () => {
    if (counter === popularProducts.length - 1) {
      setCounter(0);
    } else {
      setCounter((prev) => prev + 1);
    }
  };
  const prevProductChange = () => {
    if (counter === 0) {
      setCounter(popularProducts.length - 1);
    } else {
      setCounter((prev) => prev - 1);
    }
  };
  return (
    <div className="container">
      <h1 className="text-xl md:text-3xl font-semibold text-center">
        به فروشگاه ویما استایل خوش آمدید
      </h1>
      <section className="mt-10">
        <p className="text-xl section-header">محبوب ترین محصولات فروشگاه:</p>
        <div className="mx-auto w-1/2 mt-5">
          <div className="text-center">
            <div className="flex items-center">
              <ArrowForwardIosIcon
                onClick={nextProductchange}
                className="cursor-pointer"
              />
              <img
                src={popularProducts[counter].src}
                alt="product"
                className="w-max h-max"
              />
              <ArrowBackIosIcon
                onClick={prevProductChange}
                className="cursor-pointer"
              />
            </div>
            <div>
              <p className="font-semibold text-2xl">
                {popularProducts[counter].title}
              </p>
              <small className="font-medium">
                دسته بندی: {popularProducts[counter].category}
              </small>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export async function getServerSideProps() {
  const response = await getPopularProducts();
  const data = response.data;
  return {
    props: {
      popularProducts: data,
    },
  };
}
