import React, { useState } from "react";
import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { getAllProducts, getProductsBySex } from "src/api/products";

import Head from "next/head";
import { useRouter } from "next/router";
import ProductCard from "@/src/components/ProductCard/ProductCard";
import Select from "react-select";

export default function ProductsList({ products }) {
  const [data, setData] = useState(products);
  const [searchText, setSearchText] = useState("");

  const options = [
    { value: "default", label: "همه" },
    { value: "women", label: "زنانه" },
    { value: "men", label: "مردانه" },
  ];

  const router = useRouter();



  const handleChange = async (event) => {
    if (event.value !== "default") {
      const response = await getProductsBySex(event.value);
      setData(response.data);
    } else {
      setData(products);
    }

    router.push(`/products?sex=${event.value}`, undefined, { shallow: true });
  };

  const searchProductByName = () => {
    setData(
      products.filter((product) => {
        return product.title.includes(searchText);
      })
    );

    router.push(`/products?name=${searchText}`, undefined, { shallow: true });
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
      <div className="flex flex-col sm:flex-row justify-between">
        <div className="flex items-center gap-2 w-full">
          <button
            type="button"
            className="px-4 py-2 bg-primary text-white rounded-xl hover:opacity-95 transition-all"
          >
            فیلتر
          </button>
          <div className="w-1/2 md:w-1/3 xl:w-1/6">
            <Select
              options={options}
              placeholder="دسته بندی"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex items-center mt-5 sm:mt-0">
          <input
            type="text"
            placeholder="جستجو کنید ..."
            className="p-3 border rounded-lg"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <IconButton onClick={searchProductByName} className="p-2.5">
            <SearchIcon className="text-primary text-3xl" />
          </IconButton>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-5">
        {data.map((product) => (
          <ProductCard products={products} id={product.id} key={product.id} />
        ))}
      </div>
    </div>
  );
}
export async function getStaticProps() {
  const response = await getAllProducts();
  const data = response.data;
  return {
    props: {
      products: data,
    },
    revalidate: 10,
  };
}
