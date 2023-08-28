import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as cartApi from "api/cart";

export const useGetCartProducts = (data) => {
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
    refetchOnWindowFocus: false,
    // initialData: data,
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
