import axios from "axios";

export const addToCart = (data) => {
  return axios.post(`http://localhost:4000/cart-products`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
export const updateCart = (product) => {
  return axios.put(
    `http://localhost:4000/cart-products/${product.id}`,
    product,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
export const getCartProducts = () => {
  return axios.get(`http://localhost:4000/cart-products`);
};
export const removeProductFromCart = (productId) => {
  return axios.delete(`http://localhost:4000/cart-products/${productId}`);
};
