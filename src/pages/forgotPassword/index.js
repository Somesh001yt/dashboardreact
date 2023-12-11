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
  Spinner,
} from "reactstrap";
// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";

import trackLogo from "../../assets/images/logo.png";
import CarouselPage from "../CarouselPage";
import { API } from "../../Api/Api";

const RecoverPassword = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  //meta title
  document.title =
    "Recover Password  | Skote - React Admin & Dashboard Template";

  const forgotPassword = async (data) => {
    try {
      setLoading(true);
      const response = await API.forgotPassword(data);
      console.log(response);

      if (response?.success) {
        localStorage.setItem("forgotToken", response?.token);
        toast.success(response?.message);
        navigate("/login");
      } else {
        console.log({ response });
        toast.error(response?.message);
      }
    } catch (error) {
      toast.error("Network Error");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .matches(
          /^[A-Za-z0-9_%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
          "Invalid email format"
        )
        .required("Please Enter Your Email"),
    }),
    onSubmit: async (vals) => {
      forgotPassword(vals);
    },
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
                    <a
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                      }}
                      className=" auth-logo"
                    >
                      <img
                        src={trackLogo}
                        alt=""
                        height="100"
                        className="logo-dark-element object-container"
                      />
                    </a>
                  </div>
                  <div className="my-auto">
                    <div>
                      <h5 style={{fontWeight:'600' , fontSize: "20px" }} className="text-primary"> Reset Password</h5>
                      <p style={{fontWeight:'600' }} className="text-muted">Reset Password with The Track Pilot.</p>
                    </div>

                    <div className="mt-4">
                      <div
                        className="alert alert-success text-center mb-4"
                        role="alert"
                      >
                        Enter your Email and instructions will be sent to you!
                      </div>

                      <Form
                        className="form-horizontal"
                        onSubmit={(e) => {
                          e.preventDefault();
                          validation.handleSubmit();
                          return false;
                        }}
                      >
                        <div className="mb-3">
                          <Label className="form-label">Email Address</Label>
                          <Input
                            name="email"
                            className="form-control"
                            placeholder="Enter email"
                            type="email"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.email || ""}
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
                        <div className="text-end">
                          <button
                            className="btn btn-primary w-md "
                            type="submit"
                          >
                            {" "}
                            {loading ? (
                              <div>
                                <Spinner size={"sm"} color={"ffff"} />
                              </div>
                            ) : (
                              "Reset"
                            )}
                          </button>
                        </div>
                      </Form>

                      <div className="mt-5 text-center">
                        <p>
                          Remember It ?{" "}
                          <Link to="/login" className="fw-medium text-primary">
                            {" "}
                            Sign In here
                          </Link>{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 mt-md-5 text-center">
                    <p className="mb-0">
                      © {new Date().getFullYear()} The Track Pilot. Crafted with{" "}
                      <i className="mdi mdi-heart text-danger"></i> by Eitbiz
                    </p>
                  </div>
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

export default RecoverPassword;
