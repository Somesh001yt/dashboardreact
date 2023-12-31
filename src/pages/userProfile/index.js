import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Alert,
  CardBody,
  Button,
  Label,
  Input,
  FormFeedback,
  Form,
  Spinner,
} from "reactstrap";

import "./userprofile.scss";

// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";

//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import withRouter from "../../Components/Common/withRouter";

//Import Breadcrumb
import Breadcrumb from "../../Components/Common/Breadcrumb";

import avatar from "../../assets/images/profile.png";
// actions
import {
  editProfile,
  getProfileData,
  resetProfileFlag,
} from "../../store/actions";
import { GET_PROFILE_DATA } from "../../store/auth/profie/actionType";
import { event } from "jquery";
import { API } from "../../Api/Api";
import { toast } from "react-toastify";

const UserProfile = () => {
  //meta title
  document.title = "Profile | The Track Pilot";

  const profileData = useSelector((state) => state.Profile.profileData);



  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const [image, setImage] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const token = localStorage.getItem("token");
  const usrData = JSON.parse(localStorage.getItem("userData"));

  const [initialValues, setInitialValues] = useState({});
  const apiUrl = process.env.REACT_APP_API_URL

  const avatarImage = profileData?.profile_image;
  console.log(avatarImage)

  useEffect(() => {
    getMyProfileApi();
  }, []);

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

  const updateProfileApi = async (data) => {
   data.profileImage=image
     

    try {
      setLoading(true);
      const response = await API.updateProfile(data, token);
      console.log(response);
      if (response?.success) {
        toast.success(response?.message);
        getMyProfileApi();
      } else {
        console.log({ response });
        toast.error(response?.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      username: profileData?.username || "",
      address: profileData ? profileData?.address : "",
      phone: profileData ? profileData?.phone_number : "",
      profileImage: profileData ? profileData?.profile_image : avatar,
    },
    validationSchema: Yup.object({


      username: Yup.string().required("Please Enter Your UserName"),
    }),
    onSubmit: (values) => {
      updateProfileApi(values, token);
      console.log('val' ,values)
    },
  });

  // for selecting profile

  const handleImageClick = () => {
    inputRef.current.click();
  };

  const onSelectedFiles = (event) => {
    const selectedFiles = event.target.files[0];  
    setImage(selectedFiles);

    // const imageArray = selectedFilesArray.map((file) => {
    //   return URL.createObjectURL(file);
    // });
  };

  return (
    <React.Fragment>
      <div className="main-content">
        <div className="page-content">
          <Container fluid>
            {/* Render Breadcrumb */}
            <Breadcrumb title="The Track Pilot" breadcrumbItem="Profile" />

            {/* <Row>
              <Col lg="12">
                {error && error ? <Alert color="danger">{error}</Alert> : null}
                {success ? <Alert color="success">{success}</Alert> : null}

                <Card>
                  <CardBody>
                    <div className="d-flex">
                    
                      <div className="flex-grow-1 align-self-center">
                        <div className="text-muted">
                          <h5>{name}</h5>
                          <p className="mb-1">{email}</p>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row> */}
            
            <Row style={{display:'flex' , justifyContent:'center' , alignItems:'center', marginTop:'2rem'}}>
              <Col lg="6">
            <Card>
              <CardBody>
                <Form
                  className="form-horizontal"
                  onSubmit={(e) => {
                    e.preventDefault();
                    validation.handleSubmit();
                    return false;
                  }}
                >
                  <div
                    className="ms-3 mb-4"
                    style={{ position: "relative", display:'flex' , justifyContent:'center' , alignItems:'center'}}
                    onClick={() => inputRef.current.click()}
                  > 
                    {( image instanceof Blob || image instanceof File) ? ( 
                      <img
                        src={
                          image instanceof Blob || image instanceof File
                          ? URL.createObjectURL(image)
                          : `${apiUrl}/images/logo/${avatarImage}`
                        }
                        className="avatar-xl rounded-circle img-thumbnail"
                      />
                    ) : (
                      <img
                      src={
                        avatarImage !== null
                          ? `${apiUrl}/images/logo/${avatarImage}`
                          : avatar
                      }
                        // alt={avatar}
                        className="avatar-xl rounded-circle img-thumbnail "
                      />
                    )}
                    <i className="fas fa-pen-square  editIcon" />

                    <input
                      type="file"
                      className="d-none"
                      name="profileImage"
                      accept="image/jpeg , image/png , image/webp"
                      onChange={onSelectedFiles}
                      ref={inputRef}
                    />
                  </div>
                  <div className="form-group">
                    <Label className="form-label">User Name</Label>
                    <Input
                      name="username"
                      // value={name}
                      className="form-control mb-2"
                      placeholder="Enter User Name"
                      type="text"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.username || ""}
                      invalid={
                        validation.touched.username &&
                        validation.errors.username
                          ? true
                          : false
                      }
                    />
                    {validation.touched.username &&
                    validation.errors.username ? (
                      <FormFeedback type="invalid">
                        {validation.errors.username}
                      </FormFeedback>
                    ) : null}

                    <Label className="form-label">Address</Label>
                    <Input
                      name="address"
                      // value={name}
                      className="form-control mb-2"
                      placeholder="Enter Your Address"
                      type="text"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.address || ""}
                      invalid={
                        validation.touched.address && validation.errors.address
                          ? true
                          : false
                      }
                    />
                    {validation.touched.address && validation.errors.address ? (
                      <FormFeedback type="invalid">
                        {validation.errors.address}
                      </FormFeedback>
                    ) : null}
                    <Label className="form-label">Contact Number</Label>
                    <Input
                      name="phone"
                      // value={name}
                      className="form-control "
                      placeholder="Enter Your Contact Number"
                      type="text"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.phone || ""}
                      invalid={
                        validation.touched.phone && validation.errors.phone
                          ? true
                          : false
                      }
                    />
                    {validation.touched.phone && validation.errors.phone ? (
                      <FormFeedback type="invalid">
                        {validation.errors.phone}
                      </FormFeedback>
                    ) : null}
                  </div>
                  <div className="text-center mt-4">
                    <Button
                      style={{ width: "170px" }}
                      type="submit"
                      color="primary"
                    >
                      {loading ? (
                        <div>
                          <Spinner size={"sm"} color={"light"} />
                        </div>
                      ) : (
                        "Update"
                      )}
                    </Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
            </Col>
           </Row>
          </Container>
        </div>
      </div>
    </React.Fragment>
  );
};

export default withRouter(UserProfile);
