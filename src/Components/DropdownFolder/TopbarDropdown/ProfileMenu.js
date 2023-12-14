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
import { connect, useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import withRouter from "../../../Components/Common/withRouter";

// users
import user1 from "../../../assets/images/user-icon.png";
import { API } from "../../../Api/Api";
import { getProfileData } from "../../../store/actions";

const ProfileMenu = (props) => {
  // Declare a new state variable, which we'll call "menu"
  const [menu, setMenu] = useState(false);

  const profileData = useSelector((state) => state.Profile.profileData);
  const dispatch = useDispatch();

  const avatarImage = profileData?.profile_image;
  const [username, setusername] = useState("Admin");
  const token = localStorage.getItem("token");
  const apiUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate()

  const getMyProfileApi = async () => {
    try {
      const response = await API.getMyProfile(token);
      console.log(response);
      if (response?.success) {
        dispatch(getProfileData(response?.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMyProfileApi();
  }, []);

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
    localStorage.removeItem('userData')
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
            className="rounded-circle header-profile-user "
            style={{width:'30px', height:'30px' , objectFit:'contain'}}
            src={profileData?.profile_image 
              ? `${apiUrl}/images/logo/${avatarImage}`
              : user1
            }
            
            alt="Header Avatar"
          />
          <span className="d-none d-xl-inline-block ms-2 me-1">{profileData?.username}</span>
          <i className="mdi mdi-chevron-down d-none d-xl-inline-block" />
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end">
          <DropdownItem tag="a"  onClick={()=> navigate('/profile')}>
            <i className="bx bx-user font-size-16 align-middle me-1" />
            {'Profile'}
          </DropdownItem>
          <DropdownItem tag="a"  onClick={()=>navigate("/change-password")}>
              <i className="bx bx-wrench font-size-16 align-middle me-1" />
              {"Change Password"}{" "}
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
