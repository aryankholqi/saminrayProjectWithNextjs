import axios from "axios";

export const addToCart = (data) => {
  return axios.post(`http://localhost:4000/cart-products`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
export const updateCart = (data, productId) => {
  return axios.patch(`http://localhost:4000/cart-products/${productId}`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
export const getCartProducts = () => {
  return axios.get(`http://localhost:4000/cart-products`);
};
export const removeProductFromCart = (productId) => {
  return axios.delete(`http://localhost:4000/cart-products/${productId}`);
};
