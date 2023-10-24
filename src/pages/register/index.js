import React, { useState } from "react";
import { Link } from "react-router-dom";
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
import trackLogo from "../../assets/images/logo.png"
import CarouselPage from "../CarouselPage";

const Register = () => {
  const [activeTab, setactiveTab] = useState(1);
  const [passedSteps, setPassedSteps] = useState([1]);

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

  //form validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      email: "",
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Your Email"),
      username: Yup.string().required("Please Enter Your Username"),
      password: Yup.string().required("Please Enter Your Password"),
    }),
    onSubmit: (values) => {},
  });
  return (
    <React.Fragment>
      <div>
        {/* <Container fluid className="p-0"> */}
        <Row className="g-0">
          <CarouselPage />

          <Col xl={3}>
            <div className="auth-full-page-content p-md-5 p-4">
              <div className="w-100">
                <div className="d-flex flex-column h-100">
                  <div className="mb-4 mb-md-5">
                    <Link to="/dashboard" className="d-block auth-logo">
                      <img
                        src={trackLogo}
                        alt=""
                        height="100"
                        className="auth-logo-dark"
                      />
                      <img
                        src={trackLogo}
                        alt=""
                        height="100"
                        className="auth-logo-light"
                      />
                    </Link>
                  </div>
                  <div className="my-auto">
                    <div>
                      <h5 className="text-primary">Register account</h5>
                      <p className="text-muted">
                        Get your free Faags account now.
                      </p>
                    </div>

                    <div className="mt-4">
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
                                <div className="content clearfix">
                                  <TabContent
                                    activeTab={activeTab}
                                    className="body"
                                  >
                                    <TabPane tabId={1}>
                                      <Form>
                                        <Row>
                                          <Col lg="12">
                                            <div className="mb-3">
                                              <Label for="basicpill-firstname-input1">
                                                First name
                                              </Label>
                                              <Input
                                                type="text"
                                                className="form-control"
                                                id="basicpill-firstname-input1"
                                                placeholder="Enter Your First Name"
                                              />
                                            </div>
                                          </Col>
                                          
                                        </Row>

                                        <Row>
                                         
                                          <Col lg="12">
                                            <div className="mb-3">
                                              <Label for="basicpill-email-input4">
                                                Email
                                              </Label>
                                              <Input
                                                type="email"
                                                className="form-control"
                                                id="basicpill-email-input4"
                                                placeholder="Enter Your Email ID"
                                              />
                                            </div>
                                          </Col>
                                        </Row>
                                        <Row>
                                          <Col lg="12">
                                            <div className="mb-3">
                                              <Label for="basicpill-address-input1">
                                                Address
                                              </Label>
                                              <textarea
                                                id="basicpill-address-input1"
                                                className="form-control"
                                                rows="2"
                                                placeholder="Enter Your Address"
                                              />
                                            </div>
                                          </Col>
                                        </Row>
                                      </Form>
                                    </TabPane>
                                    <TabPane tabId={2}>
                                      <div>
                                        <Form>
                                          <Row>
                                            <Col lg="12">
                                              <div className="mb-3">
                                                <Label for="basicpill-pancard-input5">
                                                  PAN Card
                                                </Label>
                                                <Input
                                                  type="text"
                                                  className="form-control"
                                                  id="basicpill-pancard-input5"
                                                  placeholder="Enter Your PAN No."
                                                />
                                              </div>
                                            </Col>

                                           
                                          </Row>
                                          <Row>
                                            <Col lg="12">
                                              <div className="mb-3">
                                                <Label for="basicpill-cstno-input7">
                                                  CST No.
                                                </Label>
                                                <Input
                                                  type="text"
                                                  className="form-control"
                                                  id="basicpill-cstno-input7"
                                                  placeholder="Enter Your CST No."
                                                />
                                              </div>
                                            </Col>

                                                                                   </Row>
                                          <Row>
                                            <Col lg="12">
                                              <div className="mb-3">
                                                <Label for="basicpill-companyuin-input9">
                                                  Company UIN
                                                </Label>
                                                <Input
                                                  type="text"
                                                  className="form-control"
                                                  id="basicpill-companyuin-input9"
                                                  placeholder="Enter Your Company UIN"
                                                />
                                              </div>
                                            </Col>

                                          </Row>
                                        </Form>
                                      </div>
                                    </TabPane>
                                    <TabPane tabId={3}>
                                      <div>
                                        <Form>
                                          <Row>
                                            <Col lg="12">
                                              <div className="mb-3">
                                                <Label for="basicpill-namecard-input11">
                                                  Name on Card
                                                </Label>
                                                <Input
                                                  type="text"
                                                  className="form-control"
                                                  id="basicpill-namecard-input11"
                                                  placeholder="Enter Your Name on Card"
                                                />
                                              </div>
                                            </Col>

                                           
                                          </Row>
                                          <Row>
                                            <Col lg="12">
                                              <div className="mb-3">
                                                <Label for="basicpill-cardno-input12">
                                                  Credit Card Number
                                                </Label>
                                                <Input
                                                  type="text"
                                                  className="form-control"
                                                  id="basicpill-cardno-input12"
                                                  placeholder="Credit Card Number"
                                                />
                                              </div>
                                            </Col>

                                           
                                          </Row>
                                          <Row>
                                            <Col lg="12">
                                              <div className="mb-3">
                                                <Label for="basicpill-expiration-input13">
                                                  Expiration Date
                                                </Label>
                                                <Input
                                                  type="text"
                                                  className="form-control"
                                                  id="basicpill-expiration-input13"
                                                  placeholder="Card Expiration Date"
                                                />
                                              </div>
                                            </Col>
                                          </Row>
                                        </Form>
                                      </div>
                                    </TabPane>
                                    <TabPane tabId={4}>
                                      <div className="row justify-content-center">
                                        <Col lg="12">
                                          <div className="text-center">
                                            <div className="mb-4">
                                              <i className="mdi mdi-check-circle-outline text-success display-4" />
                                            </div>
                                            <div>
                                              <h5>Confirm Detail</h5>
                                              <p className="text-muted">
                                                If several languages coalesce,
                                                the grammar of the resulting
                                              </p>
                                            </div>
                                          </div>
                                        </Col>
                                      </div>
                                    </TabPane>
                                  </TabContent>
                                </div>
                                <div className="actions clearfix">
                                  <ul>
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
                                    <li
                                      className={
                                        activeTab === 4
                                          ? "next disabled"
                                          : "next"
                                      }
                                    >
                                      <Link
                                        to="#"
                                        onClick={() => {
                                          toggleTab(activeTab + 1);
                                        }}
                                      >
                                        Next
                                      </Link>
                                    </li>
                                  </ul>
                                </div>
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

                        <div>
                          <p className="mb-0">
                            By registering you agree to the Skote{" "}
                            <Link
                              to={"/terms&conditon"}
                              className="text-primary"
                            >
                              Terms of Use
                            </Link>
                          </p>
                        </div>

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

                      <div className="mt-5 text-center">
                        <p>
                          Already have an account ?{" "}
                          <Link to="/login" className="fw-medium text-primary">
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
                      Faags. Crafted with{" "}
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
