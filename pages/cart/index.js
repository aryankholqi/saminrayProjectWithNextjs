import { getCartProducts } from "src/api/cart";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useGetCartProducts } from "src/querries/useCart";
import CartProductCard from "@/src/components/CartProductCard/CartProductCard";
import { useGetAllProducts } from "@/src/querries/useProduct";

export default function Cart({ cartProducts }) {
  const { data: session } = useSession();

  const [totalPrice, setTotalPrice] = useState(0);

  const getCartProducts = useGetCartProducts(cartProducts);

  const allProducts = useGetAllProducts();

  useEffect(() => {
    let total = 0;
    getCartProducts?.data?.map((product) => {
      total += product.price * product.count;
    });

    setTotalPrice(total);
  }, [getCartProducts.data]);

  return (
    <div className="container">
      <Head>
        <title>سبد خرید</title>
      </Head>
      <h1 className="text-xl font-medium text-center">سبد خرید</h1>
      <hr className="w-1/2 mx-auto my-5 text-tertiary" />
      <div>
        {!allProducts.isLoading && (
          <ul className="flex flex-col gap-y-10 items-center">
            {getCartProducts.data.length === 0 ? (
              <p className="font-medium text-md md:text-xl">
                محصولی توی سبد خریدت نیست. بدو برو یه چیزی بردار
              </p>
            ) : (
              getCartProducts?.data?.map((product) => (
                <CartProductCard
                  product={product}
                  maxCount={allProducts.data[product.id - 1].count}
                  key={product.id}
                />
              ))
            )}
          </ul>
        )}
        <h2 className="mt-16 text-center">
          مبلغ قابل پرداخت: {totalPrice}تومان
        </h2>
        {session ? (
          <div className="w-max mx-auto">
            <Link href="/cart/submitform">
              <button className="bg-primary text-white px-3 py-2 mt-5 rounded-lg hover:opacity-90 transition-all">
                ادامه فرایند خرید
              </button>
            </Link>
          </div>
        ) : (
          <div className="w-max mx-auto">
            <Link href="/api/auth/signin?callbackUrl=http://localhost:3000/cart">
              <button className="bg-primary text-white px-3 py-2 mt-5 rounded-lg">
                ورود به حساب کاربری
              </button>
            </Link>
          </div>
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
