import React from "react"
import CarouselPage from "../CarouselPage"

// import images
import logodark from "../../assets/images/logo-dark.png"
import logolight from "../../assets/images/logo-light.png"
import { Col, Container, Row } from "reactstrap"
import { Link } from "react-router-dom"
import trackLogo from "../../assets/images/logo.png";

const ConfirmPassword = () => {

  //meta title
  document.title="Confirm Password ";

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
                            <i className="bx bxs-like h1 mb-0 text-primary"></i>
                          </div>
                        </div>
                        <div className="p-2 mt-4">
                          <h4>Success !</h4>
                          <p className="text-muted">
                           Your password has been updated successfully. Please Login to your account
                          </p>
                          <div className="mt-4">
                            <Link to="/login" className="btn btn-primary">
                              Back to Login 
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 mt-md-5 text-center">
                      <p className="mb-0">
                        © {new Date().getFullYear()} The Track Pilot. Crafted with{" "}
                        <i className="mdi mdi-heart text-danger"></i> by
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
  )
}

export default ConfirmPassword
