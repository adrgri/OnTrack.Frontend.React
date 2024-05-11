import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  User,
  LoginData,
  RegistrationData,
  RegistrationResult,
} from "../types";
import { api } from "../api/api";
import Cookies from "js-cookie";

type AuthContextType = {
  user: User | null;
  isLoggedIn: boolean;
  login: (loginData: LoginData) => void;
  register: (registrationData: RegistrationData) => void;
  logout: () => void;
  changePassword: (
    currentPassword: string,
    newPassword: string,
    repeatPassword: string
  ) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(
  undefined
) as React.Context<AuthContextType>;

type AuthProviderProps = {
  children: React.ReactNode;
};

const { VITE_API_URL } = import.meta.env;

const saveUserData = (user: User) => {
  localStorage.setItem("userData", JSON.stringify(user));
};

const loadUserData = () => {
  const userData = localStorage.getItem("userData");
  return userData ? JSON.parse(userData) : null;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(loadUserData());
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!user);

  console.log("User:", user);
  useEffect(() => {
    const storedAccessToken = Cookies.get("accessToken");
    const storedRefreshToken = Cookies.get("refreshToken");

    if (storedAccessToken && storedRefreshToken) {
      setIsLoggedIn(true);
    }
  }, []);

  const login = useCallback(async (loginData: LoginData) => {
    try {
      const loginResponse = await api.post(
        `${VITE_API_URL}/identity/login`,
        loginData
      );
      console.log(loginResponse.data);
      const { accessToken, refreshToken, expiresIn } = loginResponse.data;

      Cookies.set("accessToken", accessToken, { expires: expiresIn });
      Cookies.set("refreshToken", refreshToken);

      const userResponse = await api
        .get(`${VITE_API_URL}/user/me`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .catch((error) => {
          console.error("Failed to fetch user details:", error);
          throw new Error("Failed to fetch user details"); // Re-throw or handle as needed
        });

      setUser(userResponse.data);
      saveUserData(userResponse.data);
      console.log("User logged in successfully:", userResponse.data);

      setIsLoggedIn(true);
      console.log("Login successful");
    } catch (error) {
      console.error("Login failed:", error);
      setIsLoggedIn(false);
    }
  }, []);

  const register = useCallback(
    async (registrationData: RegistrationData): Promise<RegistrationResult> => {
      try {
        const response = await api.post(
          `${VITE_API_URL}/identity/register`,
          registrationData
        );
        const newUser: User = response.data; // Assuming the server returns the new user details

        console.log("User registered successfully:");

        setUser(newUser);
        saveUserData(newUser);
        setIsLoggedIn(true);

        return {
          success: true,
          message: "User registered successfully",
        };
      } catch (error) {
        console.error("Registration failed:", error);

        return {
          success: false,
          message: "Registration failed. Please try again.",
        };
      }
    },
    []
  );

  const logout = useCallback(async () => {
    try {
      // Retrieve the access token from cookies
      const accessToken = Cookies.get("accessToken");

      // If there's an access token, attempt to notify the server about the logout
      if (accessToken) {
        await api.post(
          `${VITE_API_URL}/identity/logout`,
          {},
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
      }

      // Whether or not the above API call is successful, remove the cookies
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      localStorage.removeItem("userData");
      // Update the application state
      setUser(null);
      setIsLoggedIn(false);
      console.log("Logged out successfully!");
    } catch (error) {
      console.error("Logout failed:", error);
      // Optionally, handle the logout error
    }
  }, []);

  const resetPassword = useCallback(async (email: string) => {
    try {
      await api.post(`${VITE_API_URL}/identity/forgotPassword`, { email });

      console.log("Password reset email sent to", email);
    } catch (error) {
      console.error("Failed to send password reset email", error);
    }
  }, []);

  const changePassword = useCallback(
    async (currentPassword: string, newPassword: string) => {
      console.log("Change password requested with", {
        currentPassword,
        newPassword,
      });

      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log("Password changed successfully");
      } catch (error) {
        console.error("Error changing password", error);
      }
    },
    []
  );

  const authValue = useMemo(
    () => ({
      user,
      isLoggedIn,
      login,
      register,
      logout,
      changePassword,
      resetPassword,
    }),
    [user, isLoggedIn, login, register, logout, changePassword, resetPassword]
  );

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
