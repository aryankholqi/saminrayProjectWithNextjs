import axios from "axios";

export const getAllProducts = () => {
  return axios.get(`http://localhost:4000/products`);
};
export const getProductsBySex = (sex) => {
  return axios.get(`http://localhost:4000/products?sex=${sex}`);
};
export const getProductById = (id) => {
  return axios.get(`http://localhost:4000/products/${id}`);
};
