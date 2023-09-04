import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRemoveProductFromCart, useUpdateCart } from "src/querries/useCart";
import Swal from "sweetalert2";
import { Rating } from "@mui/material";

export default function CartProductCard({ product, maxCount }) {
  const [count, setCount] = useState(product.count);
  const updateCartMutate = useUpdateCart();
  const deleteCartMutate = useRemoveProductFromCart();

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

  const updateCartHandler = (product) => {
    const updatedProduct = {
      ...product,
      count,
    };

    updateCartMutate.mutate(updatedProduct);

    generateToast();
  };

  const removeProductHandler = async (productId) => {
    deleteCartMutate.mutate(productId);
    generateToast();
  };

  const generateToast = (status) => {
    if (status === 201 || 200) {
      Toast.fire({
        icon: "success",
        title: "سبد خرید بروز شد",
      });
    }
  };
  return (
    <>
      <div
        key={product.id}
        className="flex flex-col lg:flex-row gap-y-5 items-center justify-between"
      >
        <li className="flex items-center gap-x-5 sm:gap-x-2 justify-evenly">
          <div className="w-1/3 sm:w-1/4">
            <Image
              src={product.image}
              alt={product.title}
              width={250}
              height={250}
              priority
            />
          </div>
          <Link href={`/products/${product.id}`}>
            <div>
              {product.title} - مجموع: {product.price * product.count}تومان
              <br />
              <p className="flex items-center mt-2">
                <Rating value={product.rating} readOnly />
                <span className="ms-2">موجودی: {maxCount}</span>
              </p>
            </div>
          </Link>
        </li>

        <div className="flex items-center">
          تعداد:{" "}
          <input
            type="number"
            min={0}
            max={maxCount}
            value={count}
            className="w-1/4 p-1 border rounded-md ms-2"
            onChange={(e) => setCount(e.target.value)}
          />
          <div className="flex">
            <button
              type="button"
              className="px-4 py-2 bg-primary text-white rounded-xl ms-2 hover:opacity-90 transition-all"
              onClick={() => updateCartHandler(product)}
            >
              ویرایش
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-red-600 text-white rounded-xl ms-2 hover:opacity-90 transition-all"
              onClick={() => removeProductHandler(product.id)}
            >
              حذف
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
