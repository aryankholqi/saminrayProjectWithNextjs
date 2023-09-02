import { useQuery } from "@tanstack/react-query";
import * as provinceApi from "src/api/provinces";

export const useGetAllProvinces = (provinces) => {
  return useQuery({
    queryKey: ["provinces"],
    queryFn: () =>
      provinceApi
        .getAllProvinces()
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          console.log(err);
        }),
    initialData: provinces,
  });
};

