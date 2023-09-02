import Image from "next/image";
import React, { useState } from "react";
import { Rating } from "@mui/material";
import Styles from "styles/product.module.css";
import Link from "next/link";
import Swal from "sweetalert2";
import { addToCart, getCartProducts } from "src/api/cart";
import { useQueryClient } from "@tanstack/react-query";
import { useAddToCart } from "@/src/querries/useCart";

export default function ProductCard({ products, id }) {
  const [isHover, setIsHover] = useState(false);

  const queryClient = useQueryClient();

  const addToCartMutate = useAddToCart();

  const Toast = Swal.mixin({
    toast: true,
    position: "bottom-start",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  const generateToast = (situation, message) => {
    Toast.fire({
      icon: situation,
      title: message,
    });
  };

  const selectProductHandler = async () => {
    let selectedProduct = products.find((product) => {
      return product.id === id;
    });
    selectedProduct = {
      ...selectedProduct,
      count: 1,
    };
    const cartProucts = await getCartProducts();
    const isSelectedProductExist = cartProucts.data.some((product) => {
      return product.id === selectedProduct.id;
    });
    if (isSelectedProductExist) {
      generateToast("warning", "این محصول توی سبد خریدت هست!");
    } else {
      addToCartMutate.mutate(selectedProduct, {
        onSuccess: () => {
          generateToast("success", "با موفقیت به سبد خریدت اضافه شد");
          queryClient.invalidateQueries(["cartProducts"]);
        },
        onError: () => {
          generateToast("error", "مشکلی توی ثبت درخواستت بوجود اومد!");
        },
      });
    }
  };

  return (
    <div
      className="bg-secondary-200 rounded-xl flex flex-col justify-between relative"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div
        className={`w-full bg-[rgba(238,238,238,0.5)] absolute z-10 ${
          isHover ? `flex ${Styles.cardHover}` : "hidden"
        } items-center justify-center`}
      >
        <Link href={`/products/${id}`}>
          <button
            type="button"
            className="px-3 py-2 bg-primary-300 text-secondary rounded-xl hover:opacity-90 transition-all"
          >
            مشاهده محصول
          </button>
        </Link>
      </div>
      <div className="mt-4">
        <Image
          src={products[id - 1].image}
          alt={products[id - 1].title}
          width={250}
          height={250}
          className="mx-auto w-2/3"
          priority
        />
      </div>
      <div className="mt-3 p-4">
        <h2 className="text-md font-medium">{products[id - 1].title}</h2>
        <Rating
          name="rating"
          value={products[id - 1].rating}
          readOnly
          className="mt-1"
        />
        <p>{products[id - 1].price}تومان</p>
        <button
          type="button"
          className="bg-primary text-secondary w-full py-2 mt-2 rounded-xl"
          onClick={selectProductHandler}
        >
          اضافه به سبد خرید
        </button>
      </div>
    </div>
  );
}
