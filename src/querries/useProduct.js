import { useQuery } from "@tanstack/react-query";
import * as productApi from "src/api/products";

export const useGetAllProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: () =>
      productApi
        .getAllProducts()
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          console.log(err);
        }),
  });
};
export const useGetProductById = (product, id, readyToFetch) => {
  return useQuery({
    queryKey: ["mainProduct"],
    queryFn: () =>
      productApi
        .getProductById(id)
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          console.log(err);
        }),
    initialData: product,
    enabled: readyToFetch,
  });
};
export const useGetProductBySex = () => {
  return useQuery({
    queryKey: ["productsBySex"],
    queryFn: () =>
      productApi
        .getProductsBySex(sex)
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          console.log(err);
        }),
  });
};
