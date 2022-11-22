import React, { useContext, useState } from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import NotFound from "./components/NotFound";
import Layout from "./components/Layout";
import { UserContext } from "./components/UserContext/UserProvider";

const PageRouter = () => {
  const { loggedUser } = useContext(UserContext);

  return (
    <Routes>
      <Route element={<Layout />}>
        {loggedUser ? (
          <>
            <Route path="*" element={<NotFound />} />
          </>
        ) : (
          <>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
          </>
        )}
      </Route>
    </Routes>
  );
};

export default PageRouter;
