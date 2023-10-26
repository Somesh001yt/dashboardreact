import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

//i18n
// import { withTranslation } from "react-i18next";
// Redux
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import withRouter from "../../../Components/Common/withRouter";

// users
import user1 from "../../../assets/images/users/avatar-1.jpg";

const ProfileMenu = (props) => {
  // Declare a new state variable, which we'll call "menu"
  const [menu, setMenu] = useState(false);

  const [username, setusername] = useState("Admin");

  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem("authUser")) {
      if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
        const obj = JSON.parse(localStorage.getItem("authUser"));
        setusername(obj.displayName);
      } else if (
        process.env.REACT_APP_DEFAULTAUTH === "fake" ||
        process.env.REACT_APP_DEFAULTAUTH === "jwt"
      ) {
        const obj = JSON.parse(localStorage.getItem("authUser"));
        setusername(obj.username);
      }
    }
  }, [props.success]);

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <React.Fragment>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="d-inline-block"
      >
        <DropdownToggle
          className="btn header-item "
          id="page-header-user-dropdown"
          tag="button"
        >
          <img
            className="rounded-circle header-profile-user"
            src={user1}
            alt="Header Avatar"
          />
          <span className="d-none d-xl-inline-block ms-2 me-1">{username}</span>
          <i className="mdi mdi-chevron-down d-none d-xl-inline-block" />
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end">
          <DropdownItem tag="a"  onClick={()=> navigate('/profile')}>
            <i className="bx bx-user font-size-16 align-middle me-1" />
            {/* <Link to={"/profile"}>{"Profile"} </Link>{" "} */}
            {'Profile'}
          </DropdownItem>
          <DropdownItem tag="a" href="/crypto-wallet">
            <i className="bx bx-wallet font-size-16 align-middle me-1" />
            {"My Wallet"}
          </DropdownItem>
          <DropdownItem tag="a" href="/change-password">
            {/* <Link to={"/change-password"}> */}
              <i className="bx bx-wrench font-size-16 align-middle me-1" />
              {"Change Password"}{" "}
            {/* </Link> */}
          </DropdownItem>
          <DropdownItem tag="a" href="auth-lock-screen">
            <i className="bx bx-lock-open font-size-16 align-middle me-1" />
            {"Lock screen"}
          </DropdownItem>
          <div className="dropdown-divider" />
          <DropdownItem onClick={()=> handleLogout()} className="dropdown-item">
            <i className="bx bx-power-off font-size-16 align-middle me-1 text-danger" />
            <span>{"Logout"}</span>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
};

ProfileMenu.propTypes = {
  success: PropTypes.any,
  t: PropTypes.any,
};

const mapStatetoProps = (state) => {
  const { error, success } = state.Profile;
  return { error, success };
};

// export default withRouter(
//   connect(mapStatetoProps, {})(withTranslation()(ProfileMenu))
// );

export default ProfileMenu;
