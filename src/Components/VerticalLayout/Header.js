import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

import { connect, useDispatch, useSelector } from "react-redux";
import { Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import styles from "./vertical.module.scss";
// Reactstrap
import { Dropdown, DropdownToggle, DropdownMenu } from "reactstrap";

// Import menuDropdown
import LanguageDropdown from "../DropdownFolder/TopbarDropdown/LanguageDropdown";
import NotificationDropdown from "../DropdownFolder/TopbarDropdown/NotificationDropdown";
import ProfileMenu from "../DropdownFolder/TopbarDropdown/ProfileMenu";
import megamenuImg from "../../assets/images/megamenu-img.png";

// import images
import WhiteLogo from "../../assets/images/whitelogo.svg";

import logo from "../../assets/images/logo.svg";
import logoLightSvg from "../../assets/images/logo-light.svg";

import Light from "../../assets/images/sun.png";
import Moon from "../../assets/images/moon.png";

//i18n
// import { withTranslation } from "react-i18next";

// Redux Store
import {
  showRightSidebarAction,
  toggleLeftmenu,
  changeSidebarType,
  changeLayout,
  changeLayoutMode,
  toggleSubscription,
} from "../../store/actions";
import { createSelector } from "reselect";

import { layoutTypes, layoutModeTypes } from "../../constants/layout";

const Header = (props) => { 
  const [isSubscribed, setIsSubscribed] = useState(true);

  const selectLayoutState = useSelector((state) => state.Layout.layoutModeType);
  // console.log(selectLayoutState);

  const layoutChangeState =  useSelector((state)=> state.Layout.layoutType)



  const dispatch = useDispatch();
  // const isSubscribed = useSelector(state => state.isSubscribed);

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

  function tToggle() {
    var body = document.body;
    if (window.screen.width <= 998) {
      body.classList.toggle("sidebar-enable");
    } else {
      body.classList.toggle("vertical-collpsed");
      body.classList.toggle("sidebar-enable");
    }
  }

  const handleVerticalLayout = () => {
    console.log(layoutTypes);
    if (layoutChangeState === 'vertical') {
      dispatch(changeLayout("horizontal"));
    }
  };

  const handleTheme = (theme) => {
    if (theme === "light") {
      dispatch(changeLayoutMode("light"));
      setIsSubscribed(true);
      // dispatch(toggleSubscription())
    } else {
      dispatch(changeLayoutMode("dark"));
      setIsSubscribed(false);
      // dispatch(toggleSubscription())
    }
  };

  return (
    <React.Fragment>
      <header id="page-topbar">
        <div className="navbar-header">
          <div className="d-flex">
            <div className="navbar-brand-box d-lg-none d-md-block">

              <Link to="/" className="logo logo-light">
                <span className="logo-sm object-contain">
                  <img src={WhiteLogo} alt="" height="30" />
                </span>
              </Link>
            </div>

            <button
              type="button"
              onClick={() => {
                tToggle();
              }}
              className="btn btn-sm px-3 font-size-16 header-item "
              id="vertical-menu-btn"
            >
              <i className="fa fa-fw fa-bars" />
            </button>
          </div>


          <div className="d-flex">
          <div className="dropdown d-none d-lg-inline-block ms-1 mt-1">
              <button
                type="button"
                onClick={() => {
                  toggleFullscreen();
                }}
                className="btn header-item noti-icon "
                data-toggle="fullscreen"
              >
                <i className="bx bx-fullscreen" />
              </button>
            </div>

            <div
              className={styles.verticalMenuIcon}
              onClick={handleVerticalLayout}
            >
              <i className="fas fa-align-left verticalIcon" />
            </div>

            <div className={styles.themeDiv}>
              {isSubscribed ? (
                <img
                  src={Moon}
                  alt="moon"
                  className={styles.themeDiv__themeIcon}
                  onClick={() => handleTheme("dark")}
                />
              ) : (
                <img
                  src={Light}
                  alt="light"
                  className={styles.themeDiv__themeIcon}
                  onClick={() => handleTheme("light")}
                />
              )}
            </div>

            <ProfileMenu />

            {/* <div
               onClick={() => {
                props.showRightSidebarAction(!props.showRightSidebar);
              }}
              className="dropdown d-inline-block"
            >
              <button
                type="button"
                className="btn header-item noti-icon right-bar-toggle "
              >
                <i className="bx bx-cog bx-spin" />
              </button>
            </div> */}
          </div>
        </div>
      </header>
    </React.Fragment>
  );
};

Header.propTypes = {
  changeSidebarType: PropTypes.func,
  leftMenu: PropTypes.any,
  leftSideBarType: PropTypes.any,
  showRightSidebar: PropTypes.any,
  showRightSidebarAction: PropTypes.func,
  t: PropTypes.any,
  toggleLeftmenu: PropTypes.func,
};

const mapStatetoProps = (state) => {
  const { layoutType, showRightSidebar, leftMenu, leftSideBarType } =
    state.Layout;
  return { layoutType, showRightSidebar, leftMenu, leftSideBarType };
};

export default connect(mapStatetoProps, {
  showRightSidebarAction,
  toggleLeftmenu,
  changeSidebarType,
})(Header);
// withTranslation()
