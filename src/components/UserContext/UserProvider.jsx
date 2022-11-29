import axios from "axios";
import jwtDecode from "jwt-decode";
import React, { createContext, useEffect, useState } from "react";
import cookie from "react-cookies";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [loggedUser, setLoggedUser] = useState("");
  const [users, setUsers] = useState([]);

  async function getUsers() {
    let { data } = await axios.get(
      "http://localhost:3000/api/v1/auth/allusers",
    );

    setUsers(data.users);
  }

  useEffect(() => {
    const token = cookie.load("token");
    if (token) {
      const decoded = jwtDecode(token);
      setLoggedUser(decoded);
    }
    getUsers();
  }, []);

  return (
    <UserContext.Provider value={{ loggedUser, setLoggedUser, users }}>
      {children}
    </UserContext.Provider>
  );
};
