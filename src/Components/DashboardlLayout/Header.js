import React, { useState } from "react";
import PropTypes from "prop-types";

import { connect, useDispatch } from "react-redux";

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
    if (layoutTypes.HORIZONTAL === layoutTypes.HORIZONTAL) {
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
              <Link to="/dashboard" className="logo logo-dark">
                <span className="logo-sm">
                  <img src={WhiteLogo} alt="" height="22" />
                </span>
                <span className="logo-lg">
                  <img src={WhiteLogo} alt="" height="17" />
                </span>
              </Link>

              <Link to="/dashboard" className="logo logo-light">
                <span className="logo-sm">
                  <img src={WhiteLogo} alt="" height="22" />
                </span>
                <span className="logo-lg">
                  <img src={WhiteLogo} alt="" height="50" />
                </span>
              </Link>
            </div>

            <button
              type="button"
              className="btn btn-sm px-3 font-size-16 d-lg-none header-item"
              data-toggle="collapse"
              onClick={() => {
                props.toggleLeftmenu(!props.leftMenu);
              }}
              data-target="#topnav-menu-content"
            >
              <i className="fa fa-fw fa-bars" />
            </button>
          </div>

          <div className="d-flex">
            <form className="app-search d-none d-lg-block">
              <div className="position-relative">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search..."
                />
                <span className="bx bx-search-alt" />
              </div>
            </form>
            <div className="dropdown d-none d-lg-inline-block ms-1">
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
            {/* <LanguageDropdown /> */}
          </div>

          <div className="d-flex">
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
