import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,

  (error) => {
    // Unauthorized
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
      return Promise.reject(error);
    }

    // Internal Server Error
    // if (error.response?.status >= 500) {
    //   window.location.href = "/server-error";
    //   return Promise.reject(error);
    // }

    // Network Error (No Internet / Backend Down)
    // if (error.code === "ERR_NETWORK") {
    //   window.location.href = "/server-error";
    //   return Promise.reject(error);
    // }

    return Promise.reject(error);
  }
);
export default api;