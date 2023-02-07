import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user") || null)
  );

  const login = async (inputs) => {
    const response = await axios.post("/auth/login", inputs);
    setCurrentUser(response.data);
    return response
  };

  const logout = async (inputs) => {
    await axios.post("/auth/logout");
    setCurrentUser(null);
  };
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser))
  }, [currentUser])

  const value = {
    currentUser,
    login,
    logout
  }
  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  )
};
