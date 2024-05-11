import axios from "axios";
import Cookies from "js-cookie";

const baseApiURL = import.meta.env.VITE_API_URL;

export const api = axios.create({
  baseURL: baseApiURL,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
  // withCredentials: true,
});

// api.interceptors.request.use((request) => {
//   console.log("Starting Request", JSON.stringify(request, null, 2));
//   return request;
// });

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("accessToken");
    console.log("token", token);
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
    if (error.response) {
      // Add this check
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const storedRefreshToken = Cookies.get("refreshToken");
          const response = await axios.post(
            `${baseApiURL}identity/refresh-token`,
            {
              refreshToken: storedRefreshToken,
            }
          );

          const { accessToken, refreshToken: newRefreshToken } = response.data;

          Cookies.set("accessToken", accessToken);
          Cookies.set("refreshToken", newRefreshToken);

          originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;

          return api(originalRequest);
        } catch (refreshError) {
          console.error("Unable to refresh token:", refreshError);
          return Promise.reject(refreshError);
        }
      }
    } else {
      console.error("Error without response:", error);
      // Handle errors that don't have a response (e.g., network errors)
    }
    return Promise.reject(error);
  }
);
