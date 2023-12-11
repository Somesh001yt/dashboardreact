import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Col,
  Container,
  Form,
  Row,
  Input,
  Label,
  FormFeedback,
} from "reactstrap";

// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

// import images
import logodark from "../../assets/images/logo-dark.png";
import logolight from "../../assets/images/logo-light.png";
import trackLogo from "../../assets/images/logo.png";
import CarouselPage from "../CarouselPage";
import { toast } from "react-toastify";
import { API } from "../../Api/Api";
import Spinner from "../../Components/Common/Spinner";

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [newPasswordShow, setNewPasswordShow] = useState(false);
  const [confirmPasswordShow, setConfirmPasswordShow] = useState(false);

  const { id } = useParams();

  //meta title
  document.title = "Reset Password | The Track Pilot ";

  const resetPasswordApi = async (data) => {
    data["token"] = id;

    try {
      setLoading(true);
      const response = await API.resetPassword(data);
      console.log(response);
      if (response?.success) {
        toast.success(response?.message);
        navigate('/confirm-password')
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

  // Form validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      newPassword: Yup.string()
        .matches(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[-\/:-@\[-`{-~]).{8,}$/,
          "Your password should contain a combination of uppercase and lowercase letters, at least one number, and at least one special character."
        )
        .required("Please Enter Your New Password"),
      confirmPassword: Yup.string().oneOf(
        [Yup.ref("newPassword"), null],
        "Passwords must match"
      ),
    }),
    onSubmit: (values) => {
      resetPasswordApi(values);
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
                    <Link
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                      }}
                      className="card-logo"
                    >
                      <img
                        src={trackLogo}
                        alt=""
                        height="100"
                        className="logo-dark-element"
                      />
                    </Link>
                  </div>
                  <div className="my-auto">
                    <div>
                      <h5
                        style={{ fontSize: "22px", fontWeight: "600" }}
                        className="text-primary"
                      >
                        Recover Password{" "}
                      </h5>
                      <p style={{ fontWeight: "600" }} className="text-muted">
                        Please Enter Your New Password
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
                        <div className="mb-3">
                          <Label className="form-label">New Password</Label>
                          <div className="input-group auth-pass-inputgroup">
                            <Input
                              name="newPassword"
                              value={validation.values.newPassword || ""}
                              type={newPasswordShow ? "text" : "password"}
                              placeholder="Enter New Password"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              invalid={
                                validation.touched.newPassword &&
                                validation.errors.newPassword
                                  ? true
                                  : false
                              }
                            />

                            <button
                              onClick={() =>
                                setNewPasswordShow(!newPasswordShow)
                              }
                              className="btn btn-light "
                              style={{backgroundColor:newPasswordShow ? '#b7c4d5' : '' }}
                              type="button"
                              id="password-addon"
                            >
                              <i className="mdi mdi-eye-outline"></i>
                            </button>
                            {validation.touched.newPassword &&
                            validation.errors.newPassword ? (
                              <FormFeedback type="invalid">
                                {validation.errors.newPassword}
                              </FormFeedback>
                            ) : null}
                          </div>
                        </div>

                        <div className="mb-3">
                          <Label className="form-label">Confirm Password</Label>
                          <div className="input-group auth-pass-inputgroup">
                            <Input
                              name="confirmPassword"
                              value={validation.values.confirmPassword || ""}
                              type={confirmPasswordShow ? "text" : "password"}
                              placeholder="Enter Password"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              invalid={
                                validation.touched.confirmPassword &&
                                validation.errors.confirmPassword
                                  ? true
                                  : false
                              }
                            />

                            <button
                              onClick={() =>
                                setConfirmPasswordShow(!confirmPasswordShow)
                              }
                              style={{backgroundColor:confirmPasswordShow ? '#b7c4d5' : '' }}
                              className="btn btn-light "
                              type="button"
                              id="password-addon"
                            >
                              <i className="mdi mdi-eye-outline"></i>
                            </button>
                            {validation.touched.confirmPassword &&
                            validation.errors.confirmPassword ? (
                              <FormFeedback type="invalid">
                                {validation.errors.confirmPassword}
                              </FormFeedback>
                            ) : null}
                          </div>
                        </div>

                        <div className="mt-3 d-grid">
                          <button
                            className="btn btn-primary btn-block "
                            type="submit"
                          >
                            {loading ? (
                              <div>
                                <Spinner size={"sm"} color={"ffff"} />
                              </div>
                            ) : (
                              "Reset Password"
                            )}
                          </button>
                        </div>
                      </Form>

                      <div className="mt-5 text-center">
                          <p>
                            Remember It ?{" "}
                            <Link
                              to="/login"
                              className="fw-medium text-primary"
                            >
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
                      <i className="mdi mdi-heart  heartColor"></i> by Eitbiz
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

export default ResetPassword;
