import jwtDecode from "jwt-decode";
import React, { createContext, useEffect, useState } from "react";
import cookie from "react-cookies";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [loggedUser, setLoggedUser] = useState("");

  useEffect(() => {
    const token = cookie.load("token");
    if (token) {
      const decoded = jwtDecode(token);
      setLoggedUser(decoded);
    }
  }, []);

  return (
    <UserContext.Provider value={{ loggedUser, setLoggedUser }}>
      {children}
    </UserContext.Provider>
  );
};
