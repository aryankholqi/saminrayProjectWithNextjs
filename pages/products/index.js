import React, { useState } from "react";
import {
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { getAllProducts, getProductsBySex } from "@/api/products";
import Link from "next/link";
import Image from "next/image";
import img1 from "public/images/white-tshirt.jpg";
import img2 from "public/images/black-tshirt.jpg";
import img3 from "public/images/momfit-trowser.jpg";
import img4 from "public/images/momstyle-trowser.jpg";
import img5 from "public/images/socks.jpg";
import img6 from "public/images/blakc-hoodie.jpg";
import { addToCart, getCartProducts, updateCart } from "@/api/cart";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import Swal from "sweetalert2";
import Styles from "styles/products.module.css";
import Head from "next/head";

export default function ProductsList({ products }) {
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
  const [data, setData] = useState(products);
  const [selectedCounts, setSelectedCounts] = useState({});
  const [category, setCategory] = useState("");
  const [searchText, setSearchText] = useState("");
  const images = [img1, img2, img3, img4, img5, img6];
  const handleChange = async (event) => {
    if (event.target.value !== "default") {
      const response = await getProductsBySex(event.target.value);
      setData(response.data);
    } else {
      setData(products);
    }
    setCategory(event.target.value);
  };
  const searchProductByName = () => {
    setData(
      products.filter((product) => {
        return product.title.includes(searchText);
      })
    );
  };
  const selectProductHandler = async (productId) => {
    if (selectedCounts[productId]) {
      const selectedProduct = products.find((product) => {
        return product.id === productId;
      });
      const cartProductsReq = await getCartProducts();
      const foundedCartProduct = cartProductsReq.data
        ? cartProductsReq.data.find((product) => {
            return product.id === selectedProduct.id;
          })
        : [];
      if (foundedCartProduct) {
        const updateCartReq = await updateCart(
          {
            count: foundedCartProduct.count + selectedCounts[productId],
          },
          productId
        );
        generateToast(updateCartReq.status);
      } else {
        const addToCartReq = await addToCart({
          ...selectedProduct,
          count: selectedCounts[productId],
        });
        generateToast(addToCartReq.status);
      }
      setSelectedCounts((prevCounts) => ({
        ...prevCounts,
        [productId]: 0,
      }));
    }
  };
  const generateToast = (status) => {
    if (status === 201 || 200) {
      Toast.fire({
        icon: "success",
        title: "به سبد خرید اضافه شد",
      });
    }
  };
  const increaseSelectedProduct = (productId, productCount) => {
    if ((selectedCounts[productId] || 0) < productCount) {
      setSelectedCounts((prevCounts) => ({
        ...prevCounts,
        [productId]: (prevCounts[productId] || 0) + 1,
      }));
    }
  };

  const decreaseSelectedProduct = (productId) => {
    if ((selectedCounts[productId] || 0) > 0) {
      setSelectedCounts((prevCounts) => ({
        ...prevCounts,
        [productId]: (prevCounts[productId] || 0) - 1,
      }));
    }
  };
  return (
    <div className="container my-10">
      <Head>
        <title>محصولات</title>
        <meta
          name="description"
          content="انواع تیشرت ها شلوار های روز را می توانید در فروشگاه ما پیدا کنید"
        />
      </Head>
      <div className="flex justify-between">
        <div className="flex items-center gap-2 w-full">
          <button
            type="button"
            className="px-5 py-2 bg-tertiary text-white rounded-xl"
          >
            فیلتر
          </button>
          <FormControl className="w-1/6">
            <InputLabel id="demo-simple-select-label">دسته بندی</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={category}
              label="Age"
              onChange={handleChange}
            >
              <MenuItem value="default">همه</MenuItem>
              <MenuItem value="women">زنانه</MenuItem>
              <MenuItem value="men">مردانه</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="جستجو کنید ..."
            className="p-3 border rounded-lg"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <IconButton onClick={() => searchProductByName()}>
            <SearchIcon className="text-primary" />
          </IconButton>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10">
        {data.map((product) => (
          <div
            className={`w-full mx-auto text-center flex flex-col items-center justify-between rounded-lg ${Styles.productCard} cursor-pointer`}
            key={product.id}
          >
            <Link href={`/products/${product.id}`}>
              <Image
                src={images[product.id - 1]}
                alt={product.title}
                width={300}
                height={300}
              />
            </Link>
            <div className="mb-10">
              <p className="font-medium">{product.title}</p>
              <p>قیمت: {product.price}تومان</p>
              <p>موجودی: {product.count}</p>
              <div className="flex justify-center gap-3 mt-3 items-center">
                <AddIcon
                  className="text-white bg-tertiary rounded-lg cursor-pointer active:opacity-70"
                  onClick={() =>
                    increaseSelectedProduct(product.id, product.count)
                  }
                />
                <p className="text-xl">{selectedCounts[product.id] || 0}</p>
                <RemoveIcon
                  className="text-white bg-tertiary rounded-lg cursor-pointer active:opacity-70"
                  onClick={() => decreaseSelectedProduct(product.id)}
                />
              </div>
              <button
                type="button"
                className={`px-4 py-2 mt-2 rounded-xl text-white bg-primary active:opacity-70 ${
                  product.count === 0 && "bg-opacity-50"
                }`}
                disabled={product.count === 0}
                onClick={() => selectProductHandler(product.id)}
              >
                افزودن به سبد خرید
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export async function getStaticProps() {
  console.log("generate/regenerate");
  const response = await getAllProducts();
  const data = response.data;
  return {
    props: {
      products: data,
    },
    revalidate: 10,
  };
}
