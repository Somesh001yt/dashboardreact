import React, { useEffect, useState } from "react";
import CarouselPage from "../CarouselPage";

// import images
import trackLogo from "../../assets/images/logo.png";
import { Col, Container, Row } from "reactstrap";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { API } from "../../Api/Api";
import Spinner from "../../Components/Common/Spinner";

const ConfirmMail = () => {
  const [loader, setLoader] = useState(true);
  const [isVerified, setIsVerfied] = useState(true);
  const [pageLoaded, setPageLoaded] = useState(false);
  const params = useParams();
  console.log(params);

  //meta title
  document.title = "Confirm Mail 2 | Skote - React Admin & Dashboard Template";

  useEffect(() => {
    verifyEmail();
  }, [params?.id]);

  const verifyEmail = async () => {
    
    setLoader(true);
    let param = {
      token: params?.id,
    };
    try {
      let response = await API.confirmEmail(param);
      console.log(response);
      if (response?.success) {
        toast.success(response?.message);
        setIsVerfied(true);
      } else {
        setIsVerfied(false);
        toast.error(response?.message);
      }
    } catch (error) {
      toast.error("Network error");
    } finally {
      setLoader(false);
      setPageLoaded(true)
    }
  };

  return (
    <React.Fragment>
      <div>
        {/* <Container fluid className="p-0"> */}
        <Row className="row g-0">
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
                    <div className="text-center">
                      <div className="avatar-md mx-auto">
                        <div className="avatar-title rounded-circle bg-light">
                          {loader ? (
                            <div>
                              <Spinner size={"sm"} color={"black"} />
                            </div>
                          ) : (
                            <i className="bx bx-mail-send h1 mb-0 text-primary"></i>
                          )}
                        </div>
                      </div>
                      {pageLoaded ? isVerified ? (
                        <div className="p-2 mt-4">
                          <h4>Success !</h4>
                          <p className="text-muted">
                            Your account has been verified successfully. Please
                            login with your account.
                          </p>
                          <div className="mt-4">
                            <Link to="/login" className="btn btn-primary">
                              Back to Login
                            </Link>
                          </div>
                        </div>
                      ) : (
                        <div className="p-2 mt-4">
                          <h4>Something went wrong !</h4>
                          <p className="text-muted">
                            Activation link has been expired.
                          </p>
                          <div className="mt-4">
                            <Link to="/login" className="btn btn-primary">
                              Back to Login
                            </Link>
                          </div>
                        </div>
                      ) : <div className="p-2 mt-4">
                          <h4>Please wait !</h4>
                         
                        </div>}
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

export default ConfirmMail;
