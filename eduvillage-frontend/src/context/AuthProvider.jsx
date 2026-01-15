import { useState } from "react"; // useEffect is no longer needed for initialization
import { AuthContext } from "./AuthContext";
import { jwtDecode } from "jwt-decode";

export const AuthProvider = ({ children }) => {
  // 1. Logic to get initial state immediately
  const getInitialUser = () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        return jwtDecode(token);
      } catch { // 'error' removed here to fix "defined but never used"
        localStorage.removeItem("token");
        return null;
      }
    }
    return null;
  };

  // 2. Initialize state with the function
  const [user, setUser] = useState(getInitialUser);

  const login = (userData, token) => {
    localStorage.setItem("token", token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};