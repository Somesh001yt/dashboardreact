import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
  const [loading, setLoader] = useState(false);
  const navigate = useNavigate();
  const [passwordShow, setPasswordShow] = useState(false); 

  //meta title
  document.title = "Reset Password | The Track Pilot ";




  // Form validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      newPassword: Yup.string().required("Please Enter Your Password"),
      confirmPassword: Yup.string().required("Please Enter Your Password"),
    }),
    onSubmit: (values) => {
     console.log(values)
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
                     <Link style={{width:'100%' , display:'flex' , justifyContent:'center'}} className="card-logo">
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
                       <h5 style={{fontSize:'20px'}} className="text-primary">Welcome Back !</h5>
                       <p style={{fontWeight:'600'}} className="text-muted">
                         Sign in to continue to The Track Pilot.
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
                          <Label className="form-label">
                           New Password
                          </Label>
                          <Input
                            name="newPassword"
                            className="form-control"
                            placeholder="Enter username"
                            type="password"
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
                        </div>

                         <div className="mb-3">
                           <Label className="form-label">Confirm Password</Label>
                           <div className="input-group auth-pass-inputgroup">
                             <Input
                               name="password"
                               value={validation.values.confirmPassword || ""}
                               type={passwordShow ? "text" : "password"}
                               placeholder="Enter Password"
                               onChange={validation.handleChange}
                               onBlur={validation.handleBlur}
                               invalid={
                                 validation.touched.confirmPassword && validation.errors.confirmPassword ? true : false
                               }
                             />
                             
                             <button onClick={() => setPasswordShow(!passwordShow)} className="btn btn-light " type="button" id="password-addon">
                               <i className="mdi mdi-eye-outline"></i></button>
                               {validation.touched.confirmPassword && validation.errors.confirmPassword? (
                             <FormFeedback type="invalid">{validation.errors.password}</FormFeedback>
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
                              "Log In"
                            )}
                          </button>
                        </div>
                      </Form>

                      {/* <Form action="dashboard">
                         <div className="mt-4 text-center">
                           <h5 className="font-size-14 mb-3">
                             Sign in with
                           </h5>

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
                           Don&apos;t have an account ? {" "}
                           <Link
                             to="/register"
                             className="fw-medium text-primary"
                           >
                             Signup now
                           </Link>
                         </p>
                       </div>
                     </div>
                   </div>

                   <div className="mt-4 mt-md-5 text-center">
                     <p className="mb-0">
                       © {new Date().getFullYear()} The Track Pilot. Crafted with{" "}
                       <i className="mdi mdi-heart  heartColor"></i> by
                       Eitbiz
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
