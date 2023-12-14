import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Col,
  Container,
  Form,
  FormFeedback,
  Input,
  Label,
  Row,
  Card,
  CardBody,
  FormGroup,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";

// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";
import classnames from "classnames";

//Import Breadcrumb
import Breadcrumbs from "../../Components/Common/Breadcrumb";

// import images
import logodark from "../../assets/images/logo-dark.png";
import logolight from "../../assets/images/logo-light.png";
import trackLogo from "../../assets/images/logo.png";
import CarouselPage from "../CarouselPage";
import { toast } from "react-toastify";
import { API } from "../../Api/Api";
import Spinner from "../../Components/Common/Spinner";
import styles from "./register.module.scss";

const Register = () => {
  const [activeTab, setactiveTab] = useState(1);
  const [passedSteps, setPassedSteps] = useState([1]);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const [userType, setUserType] = useState("education");
  const [passwordShow, setPasswordShow] = useState(false);
  const [confirmPasswordShow, setConfirmPasswordShow] = useState(false);

  const selectedUser = {
    corporate: "corporate",
    parent: "user",
    education: "institute",
  };

  function toggleTab(tab) {
    if (activeTab !== tab) {
      var modifiedSteps = [...passedSteps, tab];
      if (tab >= 1 && tab <= 4) {
        setactiveTab(tab);
        setPassedSteps(modifiedSteps);
      }
    }
  }

  //meta title
  document.title = "Register  | Skote - React Admin & Dashboard Template";

  const form1Schema = Yup.object({});
  const form2Schema = Yup.object({
    username: Yup.string().required(
      `Please enter your ${selectedUser[userType]} name.`
    ),
    email: Yup.string()
      .email("Please enter valid email")
      .required(`Please enter your email address.`),
    address: Yup.string().required(
      `Please enter your address.`
    ),
    // noOfMember: Yup.string().required("This field is required."),
    phone: Yup.number("Please enter valid number format").required(
      `Please enter your contact number.`
    ),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[-\/:-@\[-`{-~]).{8,}$/,
        "Your password should contain a combination of uppercase and lowercase letters, at least one number, and at least one special character."
      )
      .required(`Please enter your password.`),
    confirmPassword: Yup.string()
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[-\/:-@\[-`{-~]).{8,}$/,
        "Your password should contain a combination of uppercase and lowercase letters, at least one number, and at least one special character."
      )
      .oneOf([Yup.ref("password"), null], "Passwords must match.")
      .required(`Please enter your confirm password.`),
  });

  //form validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      userType: "",
      username: "",
      email: "",
      address: "",
      noOfMember: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: form2Schema,

    onSubmit: (values) => {
      console.log(activeTab);
      activeTab === 2 ? userRegistration(values) : toggleTab(activeTab + 1);
    },
  });

  const userRegistration = async (data) => {
    setLoader(true);
    console.log(data);
    let param = {
      username: data?.username,
      email: data?.email,
      password: data?.password,
      address: data?.address,
      phone: data?.phone,
      userType: userType,
    };
    try {
      let response = await API.userRegisteration(param);
      console.log(response);
      if (response?.success) {
        toast.success(response.message);
        toggleTab(activeTab + 1);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Network Error");
    } finally {
      setLoader(false);
    }
  };

  console.log(userType);

  return (
    <React.Fragment>
      <div>
        {/* <Container fluid className="p-0"> */}
        <Row className="g-0">
          <CarouselPage />

          <Col xl={3}>
            <div
              className={`${"auth-full-page-content p-md-5 p-4"} ${
                styles.rightBar
              }`}
            >
              <div className="w-100">
                <div className="d-flex flex-column h-100">
                  <div className="mb-4 mb-md-5">
                    <Link
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                      }}
                      className="auth-logo"
                    >
                      <img
                        src={trackLogo}
                        alt=""
                        height="100"
                        className="auth-logo-dark"
                      />
                    </Link>
                  </div>
                  <div className="my-auto">
                    <div>
                      <h5
                        style={{ fontWeight: "600", fontSize: "20px" }}
                        className="text-primary"
                      >
                        Register account
                      </h5>
                      <p style={{ fontWeight: "600" }} className="text-muted">
                        Get your free Track Pilot account now.
                      </p>
                    </div>

                    <div>
                      <Form
                        className="form-horizontal"
                        onSubmit={(e) => {
                          e.preventDefault();
                          validation.handleSubmit();
                          return false;
                        }}
                      >
                        <Row>
                          <Col lg="12">
                            <div>
                              {/* <h4 className="card-title mb-4">Basic Wizard</h4> */}
                              <div className="wizard clearfix">
                                <div className="steps clearfix"></div>
                                <div
                                  style={{ padding: 0 }}
                                  className="content clearfix"
                                >
                                  <TabContent
                                    activeTab={activeTab}
                                    className="body"
                                  >
                                    <TabPane
                                      className={`${styles.tabItem} ${
                                        activeTab === 1 && styles.active
                                      }`}
                                      tabId={1}
                                    >
                                      <div>
                                        <Row>
                                          <Col>
                                            <div className="mt-4">
                                              <h5 className="font-size-14 mb-4">
                                                Which type of user you are?
                                                We'll fit the experience to your
                                                needs. Let's get you all set up
                                                so you can select your category
                                                and begin setting up your
                                                profile.
                                              </h5>
                                              <div
                                                className={
                                                  userType === "education"
                                                    ? styles.selectedRadio
                                                    : styles.radioContainer
                                                }
                                                onClick={() =>
                                                  setUserType("education")
                                                }
                                              >
                                                <div className="form-check">
                                                  <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="userType"
                                                    id="education"
                                                    value="education"
                                                    defaultChecked
                                                    checked={
                                                      userType === "education"
                                                    }
                                                    onClick={() =>
                                                      setUserType("education")
                                                    }
                                                  />
                                                  <label
                                                    className="form-check-label"
                                                    htmlFor="education"
                                                  >
                                                    Education/Institute
                                                  </label>
                                                </div>
                                              </div>
                                              <div
                                                className={
                                                  userType === "corporate"
                                                    ? styles.selectedRadio
                                                    : styles.radioContainer
                                                }
                                                onClick={() =>
                                                  setUserType("corporate")
                                                }
                                                // id="corporate"
                                                // htmlFor="corporate"
                                              >
                                                <div className="form-check">
                                                  <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="userType"
                                                    id="corporate"
                                                    value="corporate"
                                                    checked={
                                                      userType === "corporate"
                                                    }
                                                    onClick={() =>
                                                      setUserType("corporate")
                                                    }
                                                  />
                                                  <label
                                                    className="form-check-label"
                                                    htmlFor="corporate"
                                                  >
                                                    Corporate
                                                  </label>
                                                </div>
                                              </div>
                                              <div
                                                className={
                                                  userType === "parent"
                                                    ? styles.selectedRadio
                                                    : styles.radioContainer
                                                }
                                                onClick={() =>
                                                  setUserType("parent")
                                                }
                                                // id="parent"
                                                // htmlFor="parent"
                                              >
                                                <div className="form-check">
                                                  <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="userType"
                                                    id="parent"
                                                    value="parent"
                                                    checked={
                                                      userType === "parent"
                                                    }
                                                    onClick={() =>
                                                      setUserType("parent")
                                                    }
                                                  />
                                                  <label
                                                    className="form-check-label"
                                                    htmlFor="parent"
                                                  >
                                                    Parents/Users
                                                  </label>
                                                </div>
                                              </div>
                                            </div>
                                          </Col>
                                        </Row>
                                      </div>
                                    </TabPane>
                                    <TabPane
                                      className={`${styles.tabItem} ${
                                        activeTab === 2 && styles.active
                                      }`}
                                      tabId={2}
                                    >
                                      <div>
                                        <Row>
                                          <Col lg="12">
                                            <div className="mb-3">
                                              <Label for="basicpill-pancard-input5">
                                               Full Name *
                                              </Label>
                                              <Input
                                                name="username"
                                                type="text"
                                                className="form-control"
                                                id="basicpill-pancard-input5"
                                                placeholder={`Enter Your Full Name`}
                                                onChange={
                                                  validation.handleChange
                                                }
                                                onBlur={validation.handleBlur}
                                                value={
                                                  validation.values.username ||
                                                  ""
                                                }
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
                                            </div>
                                          </Col>
                                        </Row>
                                        <Row>
                                          <Col lg="12">
                                            <div className="mb-3">
                                              <Label for="basicpill-cstno-input7">
                                                
                                                Email Address *
                                              </Label>
                                              <Input
                                                name="email"
                                                type="text"
                                                className="form-control"
                                                id="basicpill-cstno-input7"
                                                placeholder={`Enter Your Email Address`}
                                                onChange={
                                                  validation.handleChange
                                                }
                                                value={
                                                  validation.values.email || ""
                                                }
                                                onBlur={validation.handleBlur}
                                                invalid={
                                                  validation.touched.email &&
                                                  validation.errors.email
                                                    ? true
                                                    : false
                                                }
                                              />
                                              {validation.touched.email &&
                                              validation.errors.email ? (
                                                <FormFeedback type="invalid">
                                                  {validation.errors.email}
                                                </FormFeedback>
                                              ) : null}
                                            </div>
                                          </Col>
                                        </Row>
                                        <Row>
                                          <Col lg="12">
                                            <div className="mb-3">
                                              <Label for="basicpill-companyuin-input9">
                                             Address
                                                *
                                              </Label>
                                              <Input
                                                name="address"
                                                type="text"
                                                className="form-control"
                                                id="basicpill-companyuin-input9"
                                                placeholder={`Enter Your Address`}
                                                onChange={
                                                  validation.handleChange
                                                }
                                                onBlur={validation.handleBlur}
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
                                            </div>
                                          </Col>
                                        </Row>
                                        {/* <Row>
                                          <Col lg="12">
                                            <div className="mb-3">
                                              <Label for="basicpill-companyuin-input9">
                                                Total number of Members *
                                              </Label>
                                              <Input
                                                name="noOfMember"
                                                type="text"
                                                className="form-control"
                                                id="basicpill-companyuin-input9"
                                                placeholder="Enter here"
                                                onChange={
                                                  validation.handleChange
                                                }
                                                onBlur={validation.handleBlur}
                                                invalid={
                                                  validation.touched.noOfMember &&
                                                  validation.errors.noOfMember
                                                    ? true
                                                    : false
                                                }
                                              />
                                              {validation.touched.noOfMember &&
                                              validation.errors.noOfMember ? (
                                                <FormFeedback type="invalid">
                                                  {validation.errors.noOfMember}
                                                </FormFeedback>
                                              ) : null}
                                            </div>
                                          </Col>
                                        </Row> */}

                                        <Row>
                                          <Col lg="12">
                                            <div className="mb-3">
                                              <Label for="basicpill-companyuin-input9">
                                             Contact
                                                Number *
                                              </Label>
                                              <Input
                                                name="phone"
                                                type="text"
                                                className="form-control"
                                                id="basicpill-companyuin-input9"
                                                placeholder={`Enter Your Contact Number`}
                                                onChange={
                                                  validation.handleChange
                                                }
                                                onBlur={validation.handleBlur}
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
                                          </Col>
                                        </Row>

                                        <Row>
                                          <Col lg="12">
                                            <div className="mb-3">
                                              <Label for="basicpill-expiration-input13">
                                                Password *
                                              </Label>
                                              <div className="input-group auth-pass-inputgroup">
                                                <Input
                                                  name="password"
                                                  type={
                                                    !passwordShow
                                                      ? "password"
                                                      : "text"
                                                  }
                                                  className="form-control"
                                                  id="basicpill-expiration-input13"
                                                  placeholder={`Enter Password`}
                                                  onChange={
                                                    validation.handleChange
                                                  }
                                                  onBlur={validation.handleBlur}
                                                  invalid={
                                                    validation.touched
                                                      .password &&
                                                    validation.errors.password
                                                      ? true
                                                      : false
                                                  }
                                                />

                                                <button
                                                  onClick={() =>
                                                    setPasswordShow(
                                                      !passwordShow
                                                    )
                                                  }
                                                  className="btn btn-light"
                                                  style={{backgroundColor:passwordShow ? '#b7c4d5' : '' }}
                                                  type="button"
                                                  id="password-addon"
                                                >
                                                  <i className="mdi mdi-eye-outline"></i>
                                                </button>

                                                {validation.touched.password &&
                                                validation.errors.password ? (
                                                  <FormFeedback type="invalid">
                                                    {validation.errors.password}
                                                  </FormFeedback>
                                                ) : null}
                                              </div>
                                            </div>
                                          </Col>
                                        </Row>

                                        <Row>
                                          <Col lg="12">
                                            <div className="mb-3">
                                              <Label for="basicpill-expiration-input13">
                                                Confirm password *
                                              </Label>
                                              <div className="input-group auth-pass-inputgroup">
                                                <Input
                                                  name="confirmPassword"
                                                  type={
                                                    !confirmPasswordShow
                                                      ? "password"
                                                      : "text"
                                                  }
                                                  className="form-control"
                                                  id="basicpill-expiration-input13"
                                                  placeholder={`Enter Confirm Password`}
                                                  onChange={
                                                    validation.handleChange
                                                  }
                                                  onBlur={validation.handleBlur}
                                                  invalid={
                                                    validation.touched
                                                      .confirmPassword &&
                                                    validation.errors
                                                      .confirmPassword
                                                      ? true
                                                      : false
                                                  }
                                                />

                                                <button
                                                  onClick={() =>
                                                    setConfirmPasswordShow(
                                                      !confirmPasswordShow
                                                    )
                                                  }
                                                  className={`btn btn-light`}
                                                  style={{backgroundColor:confirmPasswordShow ? '#b7c4d5' : '' }}
                                                  type="button"
                                                  id="password-addon"
                                                >
                                                  <i className="mdi mdi-eye-outline"></i>
                                                </button>
                                                {validation.touched
                                                  .confirmPassword &&
                                                validation.errors
                                                  .confirmPassword ? (
                                                  <FormFeedback type="invalid">
                                                    {
                                                      validation.errors
                                                        .confirmPassword
                                                    }
                                                  </FormFeedback>
                                                ) : null}
                                              </div>
                                            </div>
                                          </Col>
                                        </Row>
                                      </div>
                                    </TabPane>

                                    <TabPane
                                      className={`${styles.tabItem} ${
                                        activeTab === 3 && styles.active
                                      }`}
                                      tabId={3}
                                    >
                                      <div className="row justify-content-center">
                                        <Col lg="12">
                                          <div className="text-center">
                                            <div className="mb-4">
                                              <i className="mdi mdi-check-circle-outline text-success display-4" />
                                            </div>
                                            <div>
                                              <h5>Confirm Email</h5>
                                              <p className="text-muted">
                                                Please confirm your email via
                                                clicking the link sent to your
                                                email address.
                                              </p>
                                            </div>
                                          </div>
                                        </Col>
                                      </div>
                                    </TabPane>
                                  </TabContent>
                                </div>
                                {activeTab !== 3 &&
                                  (loader ? (
                                    <div
                                      style={{
                                        width: "100%",
                                        display: "flex",
                                        justifyContent:'center',
                                        marginBottom: "10px",
                                      }}
                                    >
                                      {" "}
                                      <Spinner
                                        size={"sm"}
                                        color={"ffff"}
                                      />{" "}
                                    </div>
                                  ) : (
                                    <div
                                      className="actions clearfix"
                                    >
                                      <ul style={{
                                        marginTop: "20px",
                                        marginBottom: "20px",
                                        display: "flex",
                                        width: "100%",
                                        justifyContent: activeTab !== 1 ? 'space-between' : 'center',
                                      }}>
                                        {activeTab !== 1 && (
                                          <li
                                            className={
                                              activeTab === 1
                                                ? "previous disabled"
                                                : "previous"
                                            }
                                          >
                                            <Link
                                              to="#"
                                              onClick={() => {
                                                toggleTab(activeTab - 1);
                                              }}
                                            >
                                              Previous
                                            </Link>
                                          </li>
                                        )}
                                        <li
                                          className={
                                            activeTab === 3
                                              ? "next disabled"
                                              : "next"
                                          }
                                        >
                                          <Link
                                            to="#"
                                            onClick={() => {
                                              activeTab === 1
                                                ? toggleTab(activeTab + 1)
                                                : validation.handleSubmit();
                                            }}
                                          >
                                           {activeTab !==1 ? "Submit" : "Next"} 
                                          </Link>
                                        </li>
                                      </ul>
                                    </div>
                                  ))}
                              </div>
                            </div>
                          </Col>
                        </Row>

                        {/* <div className="mb-3">
                            <Label className="form-label">Email</Label>
                            <Input
                              id="email"
                              name="email"
                              className="form-control"
                              placeholder="Enter email"
                              type="email"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.email || ""}
                              invalid={
                                validation.touched.email && validation.errors.email ? true : false
                              }
                            />
                            {validation.touched.email && validation.errors.email ? (
                              <FormFeedback type="invalid">{validation.errors.email}</FormFeedback>
                            ) : null}
                          </div>

                          <div className="mb-3">
                            <Label className="form-label">Username</Label>
                            <Input
                              name="username"
                              type="text"
                              placeholder="Enter username"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.username || ""}
                              invalid={
                                validation.touched.username && validation.errors.username ? true : false
                              }
                            />
                            {validation.touched.username && validation.errors.username ? (
                              <FormFeedback type="invalid">{validation.errors.username}</FormFeedback>
                            ) : null}
                          </div>
                          <div className="mb-3">
                            <Label className="form-label">Password</Label>
                            <Input
                              name="password"
                              type="password"
                              placeholder="Enter password"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.password || ""}
                              invalid={
                                validation.touched.password && validation.errors.password ? true : false
                              }
                            />
                            {validation.touched.password && validation.errors.password ? (
                              <FormFeedback type="invalid">{validation.errors.password}</FormFeedback>
                            ) : null}
                          </div> */}
                        {activeTab === 1 &&
                        <div>
                          <p className="mb-0">
                            By registering you agree to the Track Pilot{" "}
                            <Link
                              to={"/terms-and-condition"}
                              className="text-primary"
                              style={{ fontWeight: "600" }}
                            >
                              Terms of Use
                            </Link>
                          </p>
                        </div>
}

                        {/* <div className="mt-4 d-grid">
                          <button
                            className="btn btn-primary waves-effect waves-light "
                            type="submit"
                          >
                            Register
                          </button>
                        </div> */}
                      </Form>

                      {/* <Form action="dashboard">

                          <div className="mt-4 text-center">
                            <h5 className="font-size-14 mb-3">Sign up using</h5>

                            <ul className="list-inline">
                              <li className="list-inline-item">
                                <Link
                                  to="#"
                                  className="social-list-item bg-primary text-white border-primary me-1"
                                >
                                  <i className="mdi mdi-facebook"></i>
                                </Link>
                              </li>
                              <li className="list-inline-item">
                                <Link
                                  to="#"
                                  className="social-list-item bg-info text-white border-info me-1"
                                >
                                  <i className="mdi mdi-twitter"></i>
                                </Link>
                              </li>
                              <li className="list-inline-item">
                                <Link
                                  to="#"
                                  className="social-list-item bg-danger text-white border-danger"
                                >
                                  <i className="mdi mdi-google"></i>
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </Form> */}

                      <div className="mt-4 text-center">
                        <p>
                          Already have an account ?{" "}
                          <Link
                            to="/login"
                            className=" text-primary"
                            style={{ fontWeight: "600" }}
                          >
                            {" "}
                            Login
                          </Link>{" "}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* <div className="mt-4 mt-md-5 text-center">
                    <p className="mb-0">
                      © {new Date().getFullYear()}
                      The Track Pilot. Crafted with{" "}
                      <i className="mdi mdi-heart text-danger"></i> by Eitbiz
                    </p>
                  </div> */}
                </div>
              </div>
            </div>
          </Col>
        </Row>
        {/* </Container> */}
      </div>
    </React.Fragment>
  );
};

export default Register;
