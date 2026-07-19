import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  loginUser,
  logoutUser,
  registerUser,
  getCurrentUser,
} from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true);

const isAuthenticated = !!user;

 const register = async (userData) => {
  const { data } = await registerUser(userData);

  localStorage.setItem("token", data.token);

  setUser(data.user);

  return data;
};

  const login = async (userData) => {
  const { data } = await loginUser(userData);

  localStorage.setItem("token", data.token);

  setUser(data.user);

  return data;
};

  const logout = async () => {
  localStorage.removeItem("token");

  setUser(null);
};

useEffect(() => {
  const loadUser = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const { data } = await getCurrentUser();
      setUser(data);
    } catch (error) {
      localStorage.removeItem("token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  loadUser();
}, []);

if (loading) {
  return null;
}

  return (
    <AuthContext.Provider
      value={{
  user,
  loading,
  isAuthenticated,
  register,
  login,
  logout,
}}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);