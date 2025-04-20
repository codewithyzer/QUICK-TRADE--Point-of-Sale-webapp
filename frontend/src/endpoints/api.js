import axios from "axios";
const BASE_URL = "http://127.0.0.1:8000/api/";
const LOGIN_URL = `${BASE_URL}token/`;
const LOGOUT_URL = `${BASE_URL}logout/`;
const REFRESH_URL = `${BASE_URL}token/refresh/`;
const AUTHENTICATED_URL = `${BASE_URL}authenticated/`;

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
  const res = await axios.get(`${BASE_URL}products/?${urlParams}`, {
    withCredentials: true,
  });
  return res.data;
}
