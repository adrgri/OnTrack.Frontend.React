import axios from "axios";
import Cookies from "js-cookie";

const baseApiURL = import.meta.env.VITE_API_URL;

export const api = axios.create({
  baseURL: baseApiURL,
  headers: {
    "Content-Type": "application/json",
    withCredentials: true,
  },
});

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

const onRefreshed = (token: string) => {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
};

const addRefreshSubscriber = (callback: (token: string) => void) => {
  refreshSubscribers.push(callback);
};

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response } = error;
    const originalRequest = config;

    if (response && response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve) => {
          addRefreshSubscriber((token) => {
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
            resolve(api(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const storedRefreshToken = Cookies.get("refreshToken");
        if (!storedRefreshToken) {
          console.error("Refresh token not available.");
          window.location.href = "/login"; // Redirect to login
          return Promise.reject(error);
        }

        console.log("Sending refresh token request...");
        const response = await axios.post(
          `${baseApiURL}/identity/refresh`,
          { refreshToken: storedRefreshToken },
          { withCredentials: true }
        );

        const { accessToken, refreshToken: newRefreshToken } = response.data;

        // Store the new tokens
        Cookies.set("accessToken", accessToken);
        Cookies.set("refreshToken", newRefreshToken);

        // Update the headers for the original request
        originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;

        // Notify all subscribers about the new token
        isRefreshing = false;
        onRefreshed(accessToken);

        // Retry the original request with the new token
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Unable to refresh token:", refreshError);
        isRefreshing = false;
        refreshSubscribers = [];
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        window.location.href = "/login"; // Redirect to login
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
