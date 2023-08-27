import { getCartProducts } from "@/api/cart";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Head from "next/head";

export default function Cart({ cartProducts }) {
  const { data: session } = useSession();
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    let total = 0;
    cartProducts.map((product) => {
      total += product.price * product.count;
    });
    setTotalPrice(total);
  }, []);
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
                <li>
                  {product.title} - تعداد: {product.count} - مجموع:{" "}
                  {product.price * product.count}تومان
                </li>
              </Link>
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
