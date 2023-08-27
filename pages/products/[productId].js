import { getProductById } from "@/api/products";
import React, { Fragment } from "react";
import { useRouter } from "next/router";

export default function ProductDetails({ product }) {
  const router = useRouter();
  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }
  return (
    <Fragment>
      <div className="container">
        <h1 className="text-xl font-medium">{product.title}</h1>
        <div>
            <p>دسته بندی: {product.category}</p>
            <p>موجودی: {product.count}</p>
            <p>قیمت: {product.price}تومان</p>
        </div>
      </div>
    </Fragment>
  );
}
export async function getStaticProps(context) {
  const { params } = context;
  const response = await getProductById(params.productId);
  const data = response.data;
  return {
    props: {
      product: data,
    },
  };
}
export async function getStaticPaths() {
  return {
    paths: [{ params: { productId: "1" } }],
    fallback: true,
  };
}
