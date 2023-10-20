import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Login from "../pages/login";
import Register from "../pages/register";
import RecoverPassword from "../pages/forgotPassword";
import ConfirmMail from "../pages/confirmMail";
import EmailVerification from "../pages/emailVerification";
import UserProfile from "../pages/userProfile";
import Dashboard from "../pages/Dashboard";
import HorizontalLayout from "../Components/HorizontalLayout";
import './module.index.scss'

const MainRoutes = () => {
  const nonHeaderPages = [
    "/",
    "/register",
    "/forgot-password",
    "/confirm-email",
    "/verify-email",
  ];
  const location = useLocation();

  return (
    <React.Fragment>

      <div>
      {!nonHeaderPages?.includes(location?.pathname) && <HorizontalLayout />}

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<RecoverPassword />} />
          <Route path="/confirm-email" element={<ConfirmMail />} />
          <Route path="/verify-email" element={<EmailVerification />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
      </div>
    </React.Fragment>
  );
};

export default MainRoutes;
