import React, { useContext, useState } from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./components/Home";
import Login from "./components/Login";
import MainPage from "./components/MainPage";
import Register from "./components/Register";
import NotFound from "./components/NotFound";
import Layout from "./components/Layout";
import { UserContext } from "./components/UserContext/UserProvider";
import SendMessage from "./components/SendMessage";

const PageRouter = () => {
  const { loggedUser } = useContext(UserContext);

  return (
    <Routes>
      <Route element={<Layout />}>
        {loggedUser ? (
          <>
            <Route index element={<MainPage showMessage={true} />} />
          </>
        ) : (
          <>
            <Route index element={<Home />} />
            <Route path="/findUser" element={<MainPage showMessage={true} />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </>
        )}
        <Route path="/messageUser/:id" element={<SendMessage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default PageRouter;
