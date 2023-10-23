import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Login from "../pages/login";
import Register from "../pages/register";
import RecoverPassword from "../pages/forgotPassword";
import ConfirmMail from "../pages/confirmMail";
import EmailVerification from "../pages/emailVerification";
import UserProfile from "../pages/userProfile";
import Dashboard from "../pages/Dashboard";
import HorizontalLayout from "../Components/DashboardlLayout";
import './module.index.scss'
import JobList from "../pages/JobPages/JobList";
import Pages404 from "../pages/Errors/pages-404";
import Pages500 from "../pages/Errors/pages-500";
import PagesMaintenance from "../pages/Errors/pages-maintenance";
import FormAdvanced from "../pages/Forms/FormAdvanced";

const MainRoutes = () => {
  const nonHeaderPages = [
    "/",
    "/register",
    "/forgot-password",
    "/confirm-email",
    "/verify-email",
    "/pages-404",
    "/pages-500",
    "/pages-maintenance"
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
          <Route path="/job-list" element={<JobList />} />
          <Route path="/pages-404" element={<Pages404 />} />
          <Route path="/pages-500" element={<Pages500 />} />
          <Route path="/pages-maintenance" element={<PagesMaintenance/>} />
          <Route path="/form-advanced" element={<FormAdvanced/>} />
          
        </Routes>
      </div>
    </React.Fragment>
  );
};

export default MainRoutes;
