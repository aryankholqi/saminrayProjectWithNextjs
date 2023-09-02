import { getProductById } from "@/src/api/products";
import React, { Fragment } from "react";
import { useRouter } from "next/router";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import Link from "next/link";
import HomeIcon from "@mui/icons-material/Home";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import Image from "next/image";
import { Rating } from "@mui/material";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import WarehouseOutlinedIcon from "@mui/icons-material/WarehouseOutlined";
import { getCartProducts } from "@/src/api/cart";
import { useAddToCart } from "@/src/querries/useCart";
import Swal from "sweetalert2";
import { useQueryClient } from "@tanstack/react-query";

export default function ProductDetails({ product }) {
  const queryClient = useQueryClient();

  const router = useRouter();

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

  if (router.isFallback) {
    return (
      <div className="container">
        <p className="font-medium text-xl text-center">لطفا منتظر بمانید...</p>
      </div>
    );
  }

  const generateToast = (situation, message) => {
    Toast.fire({
      icon: situation,
      title: message,
    });
  };

  const selectProductHandler = async () => {
    const selectedProduct = {
      ...product,
      count: 1,
    };
    const getCartProduct = await getCartProducts();
    const isInCart = getCartProduct.data.some((product) => {
      return product.id === selectedProduct.id;
    });
    if (isInCart) {
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
    <Fragment>
      <div className="container">
        <Breadcrumb className="mb-10">
          <BreadcrumbItem
            tag="span"
            className="font-medium text-lg text-primary"
          >
            <Link href="/" className="inline">
              <HomeIcon />
              خانه
            </Link>
          </BreadcrumbItem>{" "}
          /{" "}
          <BreadcrumbItem
            tag="span"
            className="font-medium text-lg text-primary"
          >
            <Link href="/products">
              <CheckroomIcon />
              محصولات
            </Link>
          </BreadcrumbItem>{" "}
          /{" "}
          <BreadcrumbItem tag="span" className="font-medium text-lg" active>
            {product.title}
          </BreadcrumbItem>
        </Breadcrumb>
        <div className="grid grid-cols-3 gap-5 bg-secondary-200 p-5 rounded-xl">
          <div className="col-span-1">
            <Image
              src={product.image}
              alt={product.title}
              width={1000}
              height={1000}
              className="w-full"
            />
          </div>
          <div>
            <h1 className="text-2xl font-medium">{product.title}</h1>
            <Rating value={product.rating} className="mt-3" readOnly />
            <p className="text-lg font-medium">تعداد: {product.count}</p>
            <p className="font-medium w-2/3 mt-3 text-lg">
              با خریدن این لباس میتونی عضو ویمایی ها بشی و از کلی امتیازای خوب
              بهره مند میشی
            </p>
          </div>
          <div className="bg-secondary-100 rounded-xl p-4 flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-medium">فروشنده</h2>
              <p className="mt-8 font-medium">
                <StorefrontOutlinedIcon /> ویما استایل -{" "}
                <span className="text-tertiary-100">
                  {product.rating * 20}%
                </span>{" "}
                رضایت کالا
              </p>
              <hr className="w-2/3 mx-auto text-slate-400 my-5" />
              <p className="font-medium">
                <VerifiedUserOutlinedIcon /> 7 روز تضمین بازگشت کالا
              </p>
              <hr className="w-2/3 mx-auto text-slate-400 my-5" />
              <p className="font-medium">
                <WarehouseOutlinedIcon />{" "}
                {product.count > 0 ? "موجود در انبار" : "موجود شد بهم خبر بده"}
              </p>
              <hr className="w-2/3 mx-auto text-slate-400 my-5" />
            </div>
            <div>
              <p className="font-medium text-xl text-left mb-5">
                {product.price}تومان
              </p>
              <button
                type="button"
                className="px-4 py-2 bg-primary text-secondary rounded-xl w-full transition-all hover:opacity-90"
                onClick={selectProductHandler}
              >
                افزودن به سبد خرید
              </button>
            </div>
          </div>
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
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { productId: "1" } }],
    fallback: true,
  };
}
