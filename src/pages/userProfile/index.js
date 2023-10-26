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

import avatar from "../../assets/images/users/avatar-1.jpg";
// actions
import { editProfile, resetProfileFlag } from "../../store/actions";
import { event } from "jquery";
import { API } from "../../Api/Api";
import {  toast } from "react-toastify";

const UserProfile = () => {
  //meta title
  document.title = "Profile | Skote - React Admin & Dashboard Template";

  const dispatch = useDispatch();
  const inputRef = useRef(null);

  const [email, setemail] = useState("");
  const [name, setname] = useState("");
  const [image, setImage] = useState("");
  const [loading , setLoading] = useState(false)

  const selectProfileState = (state) => state.Profile;
  const ProfileProperties = createSelector(selectProfileState, (profile) => ({
    error: profile.error,
    success: profile.success,
  }));

  const { error, success } = useSelector(ProfileProperties);

  const token = localStorage.getItem('token');
  const usrData = JSON.parse(localStorage.getItem('userData'));

  const [initialValues, setInitialValues] = useState({
    username: usrData?.username || "name",
    address: usrData?.address || "address",
    phone: usrData?.phone_number || "phone",
    profileImage: usrData?.profile_image || "profile",
  });

  // console.log(data)
  

  const updateProfileApi = async (data  ) => {
    // const formData = new FormData();
    // formData.append("profileImage", image);

    
    

    try {
      setLoading(true);
      const response = await API.updateProfile(data , token);
      console.log(response);
      if(response?.success){
        toast.success(response?.message); 
        // navigate("/dashboard");
      }else {
        console.log({response});
        toast.error(response?.message );
      }

    } catch (error) {
      console.error(error);
    }finally{
      setLoading(false)
    }
  };

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: initialValues,
    validationSchema: Yup.object({
      username: Yup.string().required("Please Enter Your UserName"),
    }),
    onSubmit: (values ) => {

      updateProfileApi(values , token);
      console.log(values , {token})
    },
  });

  // for selecting profile

  const handleImageClick = () => {
    inputRef.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
    setImage(event.target.files[0]);
  };

  return (
    <React.Fragment>
      <div className="main-content">
        <div className="page-content">
          <Container fluid>
            {/* Render Breadcrumb */}
            <Breadcrumb title="Skote" breadcrumbItem="Profile" />

            <Row>
              <Col lg="12">
                {error && error ? <Alert color="danger">{error}</Alert> : null}
                {success ? <Alert color="success">{success}</Alert> : null}

                <Card>
                  <CardBody>
                    <div className="d-flex">
                      <div
                        className="ms-3"
                        style={{ position: "relative" }}
                        onClick={handleImageClick}
                      >
                        {image ? (
                          <img
                            src={URL.createObjectURL(image)}
                            className="avatar-xl rounded-circle img-thumbnail"
                          />
                        ) : (
                          <img
                            src={avatar}
                            alt=""
                            className="avatar-xl rounded-circle img-thumbnail"
                          />
                        )}
                        <i className="fas fa-pen-square  editIcon" />

                        <input
                          type="file"
                          className="d-none"
                          name="profileImage"
                          onChange={handleImageChange}
                          ref={inputRef}
                        />
                      </div>
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
            </Row>

            <h4 className="card-title mb-4">Change User Name</h4>

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
                        validation.touched.address &&
                        validation.errors.address
                          ? true
                          : false
                      }
                    />
                    {validation.touched.address &&
                    validation.errors.address ? (
                      <FormFeedback type="invalid">
                        {validation.errors.address}
                      </FormFeedback>
                    ) : null}
                    <Label className="form-label">Contact Number</Label>
                    <Input
                      name="phone"
                      // value={name}
                      className="form-control "
                      placeholder="Enter Your Contact Info"
                      type="text"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.phone || ""}
                      invalid={
                        validation.touched.phone &&
                        validation.errors.phone
                          ? true
                          : false
                      }
                    />
                    {validation.touched.phone &&
                    validation.errors.phone ? (
                      <FormFeedback type="invalid">
                        {validation.errors.phone}
                      </FormFeedback>
                    ) : null}
                  </div>
                  <div  className="text-center mt-4" >
                    <Button style={{width:'170px'}} type="submit" color="primary">
                    {    
                              loading?
                               <div >
                              <Spinner  size={"sm"} color={"light"} /> 
                              </div> : 'Update Username'  }
                    </Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Container>
        </div>
      </div>
    </React.Fragment>
  );
};

export default withRouter(UserProfile);
