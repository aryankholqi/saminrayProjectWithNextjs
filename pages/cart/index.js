import { getCartProducts, removeProductFromCart, updateCart } from "@/api/cart";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Swal from "sweetalert2";

export default function Cart({ cartProducts }) {
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
  useEffect(() => {
    let total = 0;
    cartProducts.map((product) => {
      total += product.price * product.count;
    });
    setTotalPrice(total);
    const initialCounts = {};
    cartProducts.forEach((product) => {
      initialCounts[product.id] = product.count;
    });
    setCount(initialCounts);
  }, []);
  const changeCountHandler = (e, productId) => {
    const newCount = { ...count };
    newCount[productId] = e.target.value;
    setCount(newCount);
  };
  const updateCartHandler = async (productId) => {
    const updateCartReq = await updateCart(
      {
        count: count[productId],
      },
      productId
    );
    generateToast()
  };
  const removeProductHandler = async (productId) => {
    const deleteProductReq = await removeProductFromCart(productId);
    generateToast()
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
          {cartProducts.map((product) => (
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
                onClick={() => updateCartHandler(product.id)}
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
  const response = await getCartProducts();
  const data = response.data;
  return {
    props: {
      cartProducts: data,
    },
  };
}
