import axios from "axios";
const BASE_URL = "http://127.0.0.1:8000/api/";
const LOGIN_URL = `${BASE_URL}token/`;
const LOGOUT_URL = `${BASE_URL}logout/`;
const REFRESH_URL = `${BASE_URL}token/refresh/`;
const AUTHENTICATED_URL = `${BASE_URL}authenticated/`;
const GET_PRODUCTS_URL = `${BASE_URL}products/?`;
const GET_PRODUCT_URL = `${BASE_URL}products/`;
const POST_PRODUCTS_URL = `${BASE_URL}products/`;
const CART_URL = `${BASE_URL}cart/`;
import { useNavigate } from "react-router-dom";

export async function login(username, password) {
  const response = await axios.post(
    LOGIN_URL,
    { username: username, password: password },
    { withCredentials: true },
  );
  const data = await response.data; // returns an object {success: true}
  return data;
}

export async function logout() {
  const response = await axios.post(LOGOUT_URL, {}, { withCredentials: true });
  const data = await response.data; // returns an object {success: true}
  return data;
}

export async function is_authenticated() {
  const response = await axios.post(
    AUTHENTICATED_URL,
    {},
    { withCredentials: true },
  );
  const data = await response.data;
  return data;
}

export const refresh_token = async () => {
  try {
    const res = await axios.post(REFRESH_URL, null, {
      withCredentials: true,
    });

    if (res.data.refreshed === true) {
      return { refreshed: true };
    } else {
      return { refreshed: false };
    }
  } catch (err) {
    throw err;
  }
};

export async function get_products(urlParams) {
  const res = await axios.get(`${GET_PRODUCTS_URL}${urlParams}`, {
    withCredentials: true,
  });
  return res.data;
}

export async function new_product(
  nameParam,
  priceParam,
  categoryParam,
  rfsParam,
  imageParam,
) {
  try {
    const res = await axios.post(
      POST_PRODUCTS_URL,
      {
        name: nameParam,
        price: priceParam,
        rfs: rfsParam,
        category_id: categoryParam,
        in_stock: true,
        image: imageParam,
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
}

export async function retrieveProduct(pk) {
  try {
    const res = await axios.get(`${GET_PRODUCT_URL}${pk}/`, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    // console.error("Error during fetching data:", error);
    throw error;
  }
}

export async function viewCart() {
  try {
    const res = await axios.get(CART_URL, { withCredentials: true });
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function addToCart(id) {
  try {
    const res = await axios.post(
      CART_URL,
      { product_id: id },
      { withCredentials: true },
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function removeFromCart(id) {
  try {
    const res = await axios.delete(CART_URL, {
      data: { product_id: id },
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
}

export default BASE_URL;
