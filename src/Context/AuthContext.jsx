import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  
  const [auth, setAuth] = useState(() => {
    const stored = localStorage.getItem("auth");
    return stored ? JSON.parse(stored) : { user: null, token: null };
  });

  const login = (userData) => {
    setAuth(userData);
    localStorage.setItem("auth", JSON.stringify(userData));
  };

  const logout = () => {
    setAuth({ user: null, token: null });
    localStorage.removeItem("auth");
  };

  return (
    <AuthContext.Provider value={{ user: auth.user, token: auth.token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
