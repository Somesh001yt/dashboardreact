import logo from "./logo.svg";
import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import { layoutTypes } from "./constants/layout";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { changeLanguageData } from "./i18n";

// Import scss
import "./assets/scss/theme.scss";

// Import Pages

import MainRoutes from "./routes";

function App() {
  const userData = localStorage.getItem('userData')
   const UserData = JSON.parse(userData);
 

  useEffect(()=>{
    if(UserData){
    changeLanguageData(UserData?.user_type)
    }
  },[])

  return (
    <React.Fragment>
     
        <MainRoutes />
    
    </React.Fragment>
  );
}

export default App;
