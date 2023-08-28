import { getCartProducts } from "@/api/cart";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Swal from "sweetalert2";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import {
  useGetCartProducts,
  useRemoveProductFromCart,
  useUpdateCart,
} from "@/querries/useCart";

export default function Cart() {
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
  const [count, setCount] = useState({});
  const { data: session } = useSession();
  const [totalPrice, setTotalPrice] = useState(0);
  const cartProducts = useGetCartProducts();
  const updateCartMutate = useUpdateCart();
  const deleteCartMutate = useRemoveProductFromCart();

  useEffect(() => {
    let total = 0;
    cartProducts?.data?.map((product) => {
      total += product.price * product.count;
    });

    setTotalPrice(total);
    const initialCounts = {};
    cartProducts?.data?.forEach((product) => {
      initialCounts[product.id] = product.count;
    });

    setCount(initialCounts);
  }, [cartProducts.data]);
  const changeCountHandler = (e, productId) => {
    const newCount = { ...count };
    newCount[productId] = e.target.value;
    setCount(newCount);
  };
  const updateCartHandler = (product) => {
    const updatedProduct = {
      ...product,
      count: count[product.id],
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
    <div className="container">
      <Head>
        <title>سبد خرید</title>
      </Head>
      <h1 className="text-xl font-medium">سبد خرید</h1>
      <hr className="my-5" />
      <div>
        <ul className="flex flex-col gap-5">
          {cartProducts?.data?.map((product) => (
            <div key={product.id}>
              <Link href={`/products/${product.id}`}>
                <li className="inline-block">
                  {product.title} - تعداد: {product.count} - مجموع:{" "}
                  {product.price * product.count}تومان
                </li>
              </Link>
              <span className="ms-10">
                تعداد:{" "}
                <input
                  type="text"
                  value={count[product.id]}
                  className="w-1/12 p-1 border rounded-md"
                  onChange={(e) => changeCountHandler(e, product.id)}
                />
              </span>
              <button
                type="button"
                className="px-4 py-2 bg-tertiary text-white rounded-xl ms-2"
                onClick={() => updateCartHandler(product)}
              >
                ثبت
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-red-600 text-white rounded-xl ms-2"
                onClick={() => removeProductHandler(product.id)}
              >
                حذف
              </button>
              <hr className="w-1/3" />
            </div>
          ))}
        </ul>
        <h2 className="mt-10">مبلغ قابل پرداخت: {totalPrice}تومان</h2>
        {session ? (
          <Link href="/cart/submitform">
            <button className="bg-primary text-white px-3 py-2 mt-5 rounded-lg">
              ادامه فرایند خرید
            </button>
          </Link>
        ) : (
          <Link href="/api/auth/signin?callbackUrl=http://localhost:3000/cart">
            <button className="bg-primary text-white px-3 py-2 mt-5 rounded-lg">
              ورود به حساب کاربری
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}
export async function getServerSideProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery("cartProducts", getCartProducts);
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
