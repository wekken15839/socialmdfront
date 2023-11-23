import { useContext, createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import {
  loginRequest,
  profileRequest,
  registerRequest,
  logoutRequest,
  updateRequest,
} from "../services/auth.service";

const AuthContext = createContext();

// CCUSTOM HOOK
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context)
    throw new Error("useAuth must to be used within a AuthProvider");

  return context;
};

export const AuthProvider = (props) => {
  // [] implementar el update

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [error, setError] = useState();
  const [errors, setErrors] = useState([]);

  const login = async (data) => {
    try {
      const result = await loginRequest(data);

      if (result.data) {
        setIsAuthenticated(true);
        setIsLoading(false);
        setUser(result.data);
        setError();
        setErrors([]);
      }
    } catch (error) {
      if (error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setErrors(error.response.data.error);
      }
    }
  };

  const logout = async () => {
    try {
      await logoutRequest();
      setIsAuthenticated(false);
      setIsLoading(false);
      setUser();
    } catch (error) {
      console.error(error);
    }
  };

  const register = async (data) => {
    try {
      const result = await registerRequest(data);

      if (result.status === 200) {
        setIsAuthenticated(true);
        setIsLoading(false);
        setUser(result.data);
      }
    } catch (error) {
      if (error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setErrors(error.response.data.error);
      }
    }
  };

  const update = async (data) => {
    try {
      const result = await updateRequest(data);
      if (result.data) {
        setUser(result.data);
        setError();
      }
    } catch (error) {
      if (error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setErrors(error.response.data.error);
      }
    }
  };

  useEffect(() => {
    const checkLogin = async () => {
      const token = Cookies.get("accessToken");

      if (!token) {
        setIsAuthenticated(false);
        setIsLoading(false);
        setUser();
        return;
      }

      try {
        const result = await profileRequest();

        if (result.data) {
          setIsAuthenticated(true);
          setIsLoading(false);
          setUser(result.data);
        }
      } catch (error) {
        console.error(error);
        setIsAuthenticated(false);
        setIsLoading(false);
        setUser();
      }
    };
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        isLoading,
        error,
        setError,
        user,
        setUser,
        login,
        register,
        logout,
        update,
        errors,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
