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
  loading: boolean;
  token: string | null;
  login: (loginData: LoginData) => void;
  register: (registrationData: RegistrationData) => Promise<RegistrationResult>;
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
  Cookies.set("userData", JSON.stringify(user), { expires: 7 }); // Store for 7 days, adjust as needed
};

const loadUserData = (): User | null => {
  const userData = Cookies.get("userData");
  return userData ? JSON.parse(userData) : null;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(loadUserData());
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!user);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(
    Cookies.get("accessToken") ?? null
  );

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const storedAccessToken = Cookies.get("accessToken");
        const storedRefreshToken = Cookies.get("refreshToken");

        if (storedAccessToken && storedRefreshToken) {
          const userResponse = await api.get(`${VITE_API_URL}/user/me`, {
            headers: { Authorization: `Bearer ${storedAccessToken}` },
          });

          setUser(userResponse.data);
          setIsLoggedIn(true);
          setToken(storedAccessToken);
        }
      } catch (error) {
        console.error("Failed to check auth status:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = useCallback(async (loginData: LoginData) => {
    try {
      setLoading(true);
      const loginResponse = await api.post(
        `${VITE_API_URL}/identity/login`,
        loginData
      );
      const { accessToken, refreshToken, expiresIn } = loginResponse.data;

      Cookies.set("accessToken", accessToken, { expires: expiresIn });
      Cookies.set("refreshToken", refreshToken);
      setToken(accessToken);

      const userResponse = await api.get(`${VITE_API_URL}/user/me`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      console.log("User logged in:", userResponse.data);

      setUser(userResponse.data);
      saveUserData(userResponse.data);
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Login failed:", error);
      setIsLoggedIn(false);
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(
    async (registrationData: RegistrationData): Promise<RegistrationResult> => {
      try {
        setLoading(true);
        const response = await api.post(
          `${VITE_API_URL}/identity/register`,
          registrationData
        );
        const newUser: User = response.data;
        console.log("User registered:", newUser);

        const loginResponse = await api.post(`${VITE_API_URL}/identity/login`, {
          email: registrationData.email,
          password: registrationData.password,
        });
        const { accessToken, refreshToken, expiresIn } = loginResponse.data;

        Cookies.set("accessToken", accessToken, { expires: expiresIn });
        Cookies.set("refreshToken", refreshToken);
        setToken(accessToken);

        await api.put(
          `${VITE_API_URL}/user/me`,
          {
            firstName: registrationData.firstName,
            lastName: registrationData.lastName,
          },
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );

        const userResponse = await api.get(`${VITE_API_URL}/user/me`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        setUser(userResponse.data);
        saveUserData(userResponse.data);
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
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const logout = useCallback(async () => {
    try {
      setLoading(true);
      const accessToken = Cookies.get("accessToken");

      if (accessToken) {
        await api.post(
          `${VITE_API_URL}/identity/logout`,
          {},
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
      }

      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      Cookies.remove("userData");

      setUser(null);
      setIsLoggedIn(false);
      setToken(null);
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const resetPassword = useCallback(async (email: string) => {
    try {
      setLoading(true);
      await api.post(`${VITE_API_URL}/identity/forgotPassword`, { email });

      console.log("Password reset email sent to", email);
    } catch (error) {
      console.error("Failed to send password reset email", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const changePassword = useCallback(
    async (currentPassword: string, newPassword: string) => {
      console.log("Changing password", currentPassword, newPassword);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
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
      loading,
      token,
      login,
      register,
      logout,
      changePassword,
      resetPassword,
    }),
    [
      user,
      isLoggedIn,
      loading,
      token,
      login,
      register,
      logout,
      changePassword,
      resetPassword,
    ]
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
