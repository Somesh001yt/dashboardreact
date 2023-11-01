import React, { useState } from "react";
import {
  Input,
  Label,
  FormFeedback,
  Spinner,
  Col,
  Container,
  Row,
  Card,
  CardBody,
} from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { API } from "../../Api/Api";
import { toast } from "react-toastify";

const ChangePassword = () => {
  const [oldPasswordShow, setOldPasswordShow] = useState(false);
  const [newPasswordShow, setNewPasswordShow] = useState(false);
  const [confirmPasswordShow, setConfirmPasswordShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const updatePassoword = async (data) => {
    try {
      setLoading(true);
      const response = await API.userUpdatePassword(data, token);
      console.log(response);
      if (response?.success) {
        toast.success(response?.message);
        navigate("/dashboard");
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
    enableReinitialize: true,
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      oldPassword: Yup.string().required("Please Enter Your Old Password"),
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
      updatePassoword(values);
    },
  });

  const togglePasswordVisibility = (field) => {
    switch (field) {
      case "oldPassword":
        setOldPasswordShow(!oldPasswordShow);
        break;
      case "newPassword":
        setNewPasswordShow(!newPasswordShow);
        break;
      case "confirmPassword":
        setConfirmPasswordShow(!confirmPasswordShow);
        break;
      default:
        break;
    }
  };

  return (
    <div className="main-content">
      <div className="page-content">
        <Container fluid>
          <div className="mt-4">
            <Row style={{display:'flex' , justifyContent:'center' , alignItems:'center', marginTop:'2rem'}}>
              <Col lg="6" >
                <Card >
                  <CardBody>
                    <form
                      className="form-horizontal"
                      onSubmit={(e) => {
                        e.preventDefault();
                        validation.handleSubmit();
                        return false;
                      }}
                    >
                      <div className="mb-3">
                        <Label className="form-label">Old Password</Label>
                        <div className="input-group auth-pass-inputgroup">
                          <Input
                            name="oldPassword"
                            type={oldPasswordShow ? "text" : "password"}
                            placeholder="Enter Password"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.oldPassword}
                            invalid={
                              validation.touched.oldPassword &&
                              validation.errors.oldPassword
                            }
                          />
                         
                          <button
                            onClick={() =>
                              togglePasswordVisibility("oldPassword")
                            }
                            className="btn btn-light"
                            type="button"
                            id="password-addon"
                          >
                            <i
                              className={`mdi mdi-eye${
                                oldPasswordShow ? "-off" : ""
                              }`}
                            ></i>
                          </button>
                          {validation.touched.oldPassword &&
                        validation.errors.oldPassword ? (
                          <FormFeedback type="invalid">
                            {validation.errors.oldPassword}
                          </FormFeedback>
                        ) : null}
                        </div>
                        
                      </div>

                      <div className="mb-3">
                        <Label className="form-label">New Password</Label>
                        <div className="input-group auth-pass-inputgroup">
                          <Input
                            name="newPassword"
                            type={newPasswordShow ? "text" : "password"}
                            placeholder="Enter Password"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.newPassword}
                            invalid={
                              validation.touched.newPassword &&
                              validation.errors.newPassword
                                ? true
                                : false
                            }
                          />
                         
                          <button
                            onClick={() =>
                              togglePasswordVisibility("newPassword")
                            }
                            className="btn btn-light"
                            type="button"
                            id="password-addon"
                          >
                            <i
                              className={`mdi mdi-eye${
                                newPasswordShow ? "-off" : ""
                              }`}
                            ></i>
                          </button>
                          {validation.touched.newPassword &&
                          validation.errors.newPassword ? (
                            <FormFeedback type="invalid">
                              {validation.errors.newPassword}
                            </FormFeedback>
                          ) : null}
                        </div>

                        {console.log("Erro Fields: ", validation.errors)}
                      </div>

                      <div className="mb-3">
                        <Label className="form-label">Confirm Password</Label>
                        <div className="input-group auth-pass-inputgroup">
                          <Input
                            name="confirmPassword"
                            type={confirmPasswordShow ? "text" : "password"}
                            placeholder="Enter Password"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.confirmPassword}
                            invalid={
                              validation.touched.confirmPassword &&
                              validation.errors.confirmPassword
                            }
                          />
                         
                          <button
                            onClick={() =>
                              togglePasswordVisibility("confirmPassword")
                            }
                            className="btn btn-light"
                            type="button"
                            id="password-addon"
                          >
                            <i
                              className={`mdi mdi-eye${
                                confirmPasswordShow ? "-off" : ""
                              }`}
                            ></i>
                          </button>
                          {validation.touched.confirmPassword &&
                          validation.errors.confirmPassword ? (
                            <FormFeedback type="invalid">
                              {validation.errors.confirmPassword}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </div>

                      <div style={{display:'flex' , justifyContent:'center'}} className="mt-4 d-grid">
                        <button
                          className="btn btn-primary btn-block"
                          type="submit"
                          style={{width:'180px'}}
                        >
                          {loading ? (
                            <Spinner size="sm" color="ffff" />
                          ) : (
                            "Submit"
                          )}
                        </button>
                      </div>
                    </form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default ChangePassword;
