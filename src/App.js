import logo from "./logo.svg";
import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import { layoutTypes } from "./constants/layout";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";

// Import scss
import "./assets/scss/theme.scss";

// Import Pages

import MainRoutes from "./routes";

function App() {

  return (
    <React.Fragment>
     
        <MainRoutes />
    
    </React.Fragment>
  );
}

export default App;
