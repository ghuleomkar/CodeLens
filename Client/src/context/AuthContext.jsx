import { createContext, useContext, useState } from "react";


// Create Auth Context
const AuthContext = createContext();


// Auth Provider
export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(() => {

    const storedUser = localStorage.getItem("user");

    return storedUser
      ? JSON.parse(storedUser)
      : null;

  });


  const login = (userData, token) => {

    localStorage.setItem(
      "user",
      JSON.stringify(userData)
    );

    localStorage.setItem(
      "token",
      token
    );

    setUser(userData);

  };


  const logout = () => {

    localStorage.removeItem("user");

    localStorage.removeItem("token");

    setUser(null);

  };


  return (

    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >

      {children}

    </AuthContext.Provider>

  );

};


// Custom Hook
export const useAuth = () => {

  return useContext(AuthContext);

};