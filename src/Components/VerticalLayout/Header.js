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
  const [search, setsearch] = useState(false);
  const [megaMenu, setmegaMenu] = useState(false);
  const [socialDrp, setsocialDrp] = useState(false);
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
            <form className="app-search d-none d-lg-block">
              <div className="position-relative">
                <input
                  type="text"
                  className="form-control"
                  placeholder={"Search" + "..."}
                />
                <span className="bx bx-search-alt" />
              </div>
            </form>

            {/* <Dropdown
              className="dropdown-mega d-none d-lg-block ms-2"
              isOpen={megaMenu}
              toggle={() => {
                setmegaMenu(!megaMenu);
              }}
            >
              <DropdownToggle className="btn header-item " caret tag="button">
                {" "}
                {"Mega Menu"} <i className="mdi mdi-chevron-down" />
              </DropdownToggle>
              <DropdownMenu className="dropdown-megamenu">
                <Row>
                  <Col sm={8}>
                    <Row>
                      <Col md={4}>
                        <h5 className="font-size-14 mt-0">{"UI Components"}</h5>
                        <ul className="list-unstyled megamenu-list">
                          <li>
                            <Link to="#">{"Lightbox"}</Link>
                          </li>
                          <li>
                            <Link to="#">{"Range Slider"}</Link>
                          </li>
                          <li>
                            <Link to="#">{"Sweet Alert"}</Link>
                          </li>
                          <li>
                            <Link to="#">{"Rating"}</Link>
                          </li>
                          <li>
                            <Link to="#">{"Forms"}</Link>
                          </li>
                          <li>
                            <Link to="#">{"Tables"}</Link>
                          </li>
                          <li>
                            <Link to="#">{"Charts"}</Link>
                          </li>
                        </ul>
                      </Col>

                      <Col md={4}>
                        <h5 className="font-size-14 mt-0">{"Applications"}</h5>
                        <ul className="list-unstyled megamenu-list">
                          <li>
                            <Link to="#">{"Ecommerce"}</Link>
                          </li>
                          <li>
                            <Link to="#">{"Calendar"}</Link>
                          </li>
                          <li>
                            <Link to="#">{"Email"}</Link>
                          </li>
                          <li>
                            <Link to="#">{"Projects"}</Link>
                          </li>
                          <li>
                            <Link to="#">{"Tasks"}</Link>
                          </li>
                          <li>
                            <Link to="#">{"Contacts"}</Link>
                          </li>
                        </ul>
                      </Col>

                      <Col md={4}>
                        <h5 className="font-size-14 mt-0">{"Extra Pages"}</h5>
                        <ul className="list-unstyled megamenu-list">
                          <li>
                            <Link to="#">{"Light Sidebar"}</Link>
                          </li>
                          <li>
                            <Link to="#">{"Compact Sidebar"}</Link>
                          </li>
                          <li>
                            <Link to="#">{"Horizontal layout"}</Link>
                          </li>
                          <li>
                            <Link to="#"> {"Maintenance"}</Link>
                          </li>
                          <li>
                            <Link to="#">{"Coming Soon"}</Link>
                          </li>
                          <li>
                            <Link to="#">{"Timeline"}</Link>
                          </li>
                          <li>
                            <Link to="#">{"FAQs"}</Link>
                          </li>
                        </ul>
                      </Col>
                    </Row>
                  </Col>
                  <Col sm={4}>
                    <Row>
                      <Col sm={6}>
                        <h5 className="font-size-14 mt-0">{"UI Components"}</h5>
                        <ul className="list-unstyled megamenu-list">
                          <li>
                            <Link to="#">{"Lightbox"}</Link>
                          </li>
                          <li>
                            <Link to="#">{"Range Slider"}</Link>
                          </li>
                          <li>
                            <Link to="#">{"Sweet Alert"}</Link>
                          </li>
                          <li>
                            <Link to="#">{"Rating"}</Link>
                          </li>
                          <li>
                            <Link to="#">{"Forms"}</Link>
                          </li>
                          <li>
                            <Link to="#">{"Tables"}</Link>
                          </li>
                          <li>
                            <Link to="#">{"Charts"}</Link>
                          </li>
                        </ul>
                      </Col>

                      <Col sm={5}>
                        <div>
                          <img
                            src={megamenuImg}
                            alt=""
                            className="img-fluid mx-auto d-block"
                          />
                        </div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </DropdownMenu>
            </Dropdown> */}

            <div className="dropdown d-inline-block d-lg-none ms-2">
              <button
                onClick={() => {
                  setsearch(!search);
                }}
                type="button"
                className="btn header-item noti-icon "
                id="page-header-search-dropdown"
              >
                <i className="mdi mdi-magnify" />
              </button>
              <div
                className={
                  search
                    ? "dropdown-menu dropdown-menu-lg dropdown-menu-end p-0 show"
                    : "dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
                }
                aria-labelledby="page-header-search-dropdown"
              >
                <form className="p-3">
                  <div className="form-group m-0">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search ..."
                        aria-label="Recipient's username"
                      />
                      <div className="input-group-append">
                        <button className="btn btn-primary" type="submit">
                          <i className="mdi mdi-magnify" />
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            {/* <LanguageDropdown /> */}
            {/* 
            <Dropdown
              className="d-none d-lg-inline-block ms-1"
              isOpen={socialDrp}
              toggle={() => {
                setsocialDrp(!socialDrp);
              }}
            >
              <DropdownToggle
                className="btn header-item noti-icon "
                tag="button"
              >
                <i className="bx bx-customize" />
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-lg dropdown-menu-end">
                <div className="px-lg-2">
                  <Row className="no-gutters">
                    <Col>
                      <Link className="dropdown-icon-item" to="#">
                        <img src={github} alt="Github" />
                        <span>GitHub</span>
                      </Link>
                    </Col>
                    <Col>
                      <Link className="dropdown-icon-item" to="#">
                        <img src={bitbucket} alt="bitbucket" />
                        <span>Bitbucket</span>
                      </Link>
                    </Col>
                    <Col>
                      <Link className="dropdown-icon-item" to="#">
                        <img src={dribbble} alt="dribbble" />
                        <span>Dribbble</span>
                      </Link>
                    </Col>
                  </Row>

                  <Row className="no-gutters">
                    <Col>
                      <Link className="dropdown-icon-item" to="#">
                        <img src={dropbox} alt="dropbox" />
                        <span>Dropbox</span>
                      </Link>
                    </Col>
                    <Col>
                      <Link className="dropdown-icon-item" to="#">
                        <img src={mail_chimp} alt="mail_chimp" />
                        <span>Mail Chimp</span>
                      </Link>
                    </Col>
                    <Col>
                      <Link className="dropdown-icon-item" to="#">
                        <img src={slack} alt="slack" />
                        <span>Slack</span>
                      </Link>
                    </Col>
                  </Row>
                </div>
              </DropdownMenu>
            </Dropdown> */}

            <div className="dropdown d-none d-lg-inline-block ms-1">
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

            {/* <NotificationDropdown /> */}
          </div>

          <div className="d-flex">
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
