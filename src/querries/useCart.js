import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as cartApi from "src/api/cart";

export const useGetCartProducts = (cartProducts) => {
  return useQuery({
    queryKey: ["cartProducts"],
    queryFn: () =>
      cartApi
        .getCartProducts()
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          console.log(err);
        }),
    initialData: cartProducts,
    refetchOnWindowFocus: false,
  });
};
export const useUpdateCart = () => {
  const queryClient = useQueryClient();
  return useMutation(cartApi.updateCart, {
    onSuccess: () => {
      queryClient.invalidateQueries(["cartProducts"]);
    },
  });
};
export const useRemoveProductFromCart = () => {
  const queryClient = useQueryClient();
  return useMutation(cartApi.removeProductFromCart, {
    onSuccess: () => {
      queryClient.invalidateQueries(["cartProducts"]);
    },
  });
};

export const useAddToCart = () => {
  return useMutation(cartApi.addToCart);
};
