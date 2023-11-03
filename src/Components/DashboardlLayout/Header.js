import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { connect, useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import "./header.scss";

// Redux Store
import { showRightSidebarAction, toggleLeftmenu } from "../../store/actions";
// reactstrap
import { Row, Col, Dropdown, DropdownToggle, DropdownMenu } from "reactstrap";

// Import menuDropdown
import LanguageDropdown from "../DropdownFolder/TopbarDropdown/LanguageDropdown";
import NotificationDropdown from "../DropdownFolder/TopbarDropdown/NotificationDropdown";
import ProfileMenu from "../DropdownFolder/TopbarDropdown/ProfileMenu";

import megamenuImg from "../../assets/images/megamenu-img.png";
import logo from "../../assets/images/logo.svg";
import logoLight from "../../assets/images/logo-light.png";
import logoLightSvg from "../../assets/images/logo-light.svg";
import logoDark from "../../assets/images/logo-dark.png";
import WhiteLogo from "../../assets/images/whitelogo.svg"

import Light from "../../assets/images/sun.png";
import Moon from "../../assets/images/moon.png";
//i18n
// import { withTranslation } from "react-i18next";

import {
  changeLayout,
  changeLayoutMode,
  changeLayoutWidth,
} from "../../store/actions";

import {
   layoutTypes,
  layoutModeTypes,
  layoutWidthTypes,
} from "../../constants/layout";
import { createSelector } from "reselect";

const Header = (props) => {
  const [menu, setMenu] = useState(false);
  const [isSearch, setSearch] = useState(false);
  const [socialDrp, setsocialDrp] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(true);

  const selectLayoutState = useSelector((state) => state.Layout.layoutModeType)
  // console.log(selectLayoutState)

  const layoutChangeState =  useSelector((state)=> state.Layout.layoutType)
  console.log(layoutChangeState)


  useEffect(()=>{
    if(selectLayoutState === "light"){
      setIsSubscribed(true)
    }
    else{
      setIsSubscribed(false)
    }
  },[selectLayoutState])


  function toggleFullscreen() {
    if (
      !document.fullscreenElement &&
      /* alternative standard method */ !document.mozFullScreenElement &&
      !document.webkitFullscreenElement
    ) {
      // current working methods
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen(
          Element.ALLOW_KEYBOARD_INPUT
        );
      }
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    }
  }

  const dispatch = useDispatch();

  const handleLayoutModeChange = () => {
    console.log(layoutTypes);
    if (layoutChangeState === 'horizontal') {
      dispatch(changeLayout("vertical"));
    }
  };

  const handleTheme = (theme) => {

    if(theme === "light"){
      dispatch(changeLayoutMode("light"));
      setIsSubscribed(true)
    }
    else{
      dispatch(changeLayoutMode("dark"));
      setIsSubscribed(false)
    }
    
  };


  // const handletoggle = (event) => {
  //   if (event.target.checked) {
  //     handleLightTheme();
  //   } else {
  //     handleDarkTheme();
  //   }
  //   setIsSubscribed((current) => !current);
  // };

  return (
    <React.Fragment>
      <header id="page-topbar">
        <div className="navbar-header">
          <div className="d-flex">
            <div className="navbar-brand-box">

              <Link to="/" className="logo logo-light">
                <span className="logo-sm">
                  <img src={WhiteLogo} alt="" height="22" />
                </span>
                <span className="logo-lg">
                  <img src={WhiteLogo} alt="" height="50" />
                </span>
              </Link>
            </div>

         
          </div>

          <div className="d-flex">
          <div className="dropdown d-none d-lg-inline-block ms-1 mt-1 " style={{marginRight:'8px'}}>
              <button
                type="button"
                className="btn header-item noti-icon "
                onClick={() => {
                  toggleFullscreen();
                }}
                data-toggle="fullscreen"
              >
                <i className="bx bx-fullscreen" />
              </button>
            </div>


            <div className="menuIcon" onClick={handleLayoutModeChange}>
              <i className="fas fa-align-justify " />
            </div>

            <div className="darkMode">
              {/* <div className="form-check form-switch form-switch-md mb-3">
                <input
                  type="checkbox"
                  className="form-check-input   checkboxInput"
                  id="customSwitchsizemd"
                  onChange={handletoggle}
                  value={isSubscribed}
                />
              </div> */}
              {/* <i className={`fas fa-${!isSubscribed ? "moon" : "bahai"}`} /> */}
              {isSubscribed ? (
                <img
                  src={Moon}
                  alt="moon"
                  className="theme"
                  onClick={()=>handleTheme("dark")}
                />
              ) : (
                <img
                  src={Light}
                  alt="light"
                  className="theme"
                  onClick={()=>handleTheme("light")}
                />
              )}
            </div>

            <ProfileMenu />
          </div>
        </div>
      </header>
    </React.Fragment>
  );
};

Header.propTypes = {
  leftMenu: PropTypes.any,
  showRightSidebar: PropTypes.any,
  showRightSidebarAction: PropTypes.func,
  t: PropTypes.any,
  toggleLeftmenu: PropTypes.func,
};

const mapStatetoProps = (state) => {
  const { layoutType, showRightSidebar, leftMenu } = state.Layout;
  return { layoutType, showRightSidebar, leftMenu };
};

export default connect(mapStatetoProps, {
  showRightSidebarAction,
  toggleLeftmenu,
})(Header);
// withTranslation()

// export default Header;
