import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { Row, Col, Collapse } from "reactstrap";
import { Link } from "react-router-dom";
import withRouter from "../Common/withRouter";
import classname from "classnames";

//i18n
// import { withTranslation } from "react-i18next";

import { connect } from "react-redux";
import { useTranslation } from "react-i18next";

const Navbar = (props) => {
  const userDataString = localStorage.getItem("userData");
  const { t, i18n } = useTranslation();
  const UserData = JSON.parse(userDataString);

 


  return (
    <React.Fragment>
      <div className="topnav">
        <div className="container-fluid">
          <nav
            className="navbar navbar-light navbar-expand-lg topnav-menu"
            id="navigation"
          >
            <Collapse
              isOpen={props.leftMenu}
              className="navbar-collapse"
              id="topnav-menu-content"
            >
              <ul className="navbar-nav">
                <li className="nav-item ">
                  <Link
                    className="nav-link "
                    // onClick={e => {
                    //   e.preventDefault();
                    //   setdashboard(!dashboard);
                    // }}
                    to="/dashboard"
                  >
                     <i className="bx bx-home-circle me-2"></i>
                    Dashboard
                  </Link>
                </li>

                <li className="nav-item dropdown">
                  <Link
                    to="/manage-department"
                    className="nav-link dropdown-toggle arrow-none "
                    style={{ textTransform: "capitalize" }}
                  >
                    <i className="bx bx-tone me-2"></i>
                    {t('class')}
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  <Link
                    to="/manage-subusers"
                    className="nav-link dropdown-toggle arrow-none "
                    style={{ textTransform: "capitalize" }}
                  >
                   <i className="bx bx-user-circle " style={{marginRight:'8px' , marginTop:'4px'}}></i>
                  {t('subuser')}
                  {console.log(t('subuser') , 'sss')}
                  </Link>
                </li>
              </ul>
            </Collapse>
          </nav>
        </div>
      </div>
    </React.Fragment>
  );
};

Navbar.propTypes = {
  leftMenu: PropTypes.any,
  location: PropTypes.any,
  menuOpen: PropTypes.any,
  t: PropTypes.any,
};

const mapStatetoProps = (state) => {
  const { leftMenu } = state.Layout;
  return { leftMenu };
};

export default withRouter(connect(mapStatetoProps, {})(Navbar));

// withTranslation()
