const baseApi = process.env.BASE_API;
import axios from "axios";

export const getPopularProducts = () => {
  return axios.get(`${baseApi}popularProducts`);
};
export const getAllProducts = () => {
  return axios.get(`${baseApi}products`);
};
export const getProductsBySex = (sex) => {
  return axios.get(`http://localhost:4000/products?sex=${sex}`);
};
export const getProductById = (id)=>{
  return axios.get(`${baseApi}products/${id}`)
}