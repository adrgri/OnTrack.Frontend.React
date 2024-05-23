import axios from "axios";
import Cookies from "js-cookie";

const baseApiURL = import.meta.env.VITE_API_URL;

export const api = axios.create({
  baseURL: baseApiURL,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    withCredentials: true,
    Authorization: `Bearer ${Cookies.get("accessToken")}`,
  },
});

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

const onRefreshed = (token: string) => {
  refreshSubscribers.forEach((callback) => callback(token));
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
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response } = error;
    const originalRequest = config;

    if (response && response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // If token refresh is in progress, queue the request
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
          return Promise.reject(error);
        }

        const response = await axios.post(`${baseApiURL}/identity/refresh`, {
          refreshToken: storedRefreshToken,
        });

        const { accessToken, refreshToken: newRefreshToken } = response.data;

        Cookies.set("accessToken", accessToken);
        Cookies.set("refreshToken", newRefreshToken);

        api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;

        isRefreshing = false;
        onRefreshed(accessToken);
        refreshSubscribers = [];

        return api(originalRequest);
      } catch (refreshError) {
        console.error("Unable to refresh token:", refreshError);
        isRefreshing = false;
        refreshSubscribers = [];
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
