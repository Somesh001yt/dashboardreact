import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Col } from "reactstrap";

// img
import authOverlay from "../assets/images/bg-auth-overlay2.png";

const CarouselPage = () => {
  return (
    <React.Fragment>
      <Col xl={9}>
        <div className="auth-full-bg pt-lg-5 p-4">
          <div className="w-100">
            <div
              className="bg-overlay"
              style={{
                background: `url(${authOverlay})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
            ></div>
            <div className="d-flex h-100 flex-column">
              <div className="p-4 mt-auto">
                <div className="row justify-content-center">
                  <div className="col-lg-7">
                    <div className="text-center">
                      <h4 className="mb-3">
                        <i className="bx bxs-quote-alt-left text-primary h1 align-middle me-3"></i>
                        <span className="text-primary">5k</span>+ Satisfied
                        clients
                      </h4>
                      <div dir="ltr">
                        <Carousel
                          className="owl-carousel owl-theme auth-review-carousel slider_css"
                          id="auth-review-carousel"
                          showThumbs={false}
                        >
                          <div>
                            <div className="item">
                              <div className="pb-5 pt-3">
                                <p className="font-size-16 mb-4">
                                  &quot;Lorem ipsum dolor sit amet, consectetur
                                  adipiscing elit. Nulla facilisi. Sed eget urna
                                  at libero vulputate convallis. Maecenas eget
                                  tortor at nunc sollicitudin feugiat. In sit
                                  amet bibendum quam. Sed gravida elit at
                                  bibendum blandit. Suspendisse potenti. Integer
                                  vitae posuere elit. Sed hendrerit ultricies
                                  diam. Vestibulum nec orci ac turpis convallis
                                  cursus.&ldquo;
                                </p>

                                <div>
                                  <h4 className="font-size-16 text-primary">
                                    User1
                                  </h4>
                                  <p className="font-size-14 mb-0">- The Track Pilot User</p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div>
                            <div className="item">
                              <div className="pb-5 pt-3">
                                <p className="font-size-16 mb-4">
                                  &quot;Lorem ipsum dolor sit amet, consectetur
                                  adipiscing elit. Nulla facilisi. Sed eget urna
                                  at libero vulputate convallis. Maecenas eget
                                  tortor at nunc sollicitudin feugiat. In sit
                                  amet bibendum quam. Sed gravida elit at
                                  bibendum blandit. &ldquo;
                                </p>

                                <div>
                                  <h4 className="font-size-16 text-primary">
                                    User2
                                  </h4>
                                  <p className="font-size-14 mb-0">
                                    - The Track Pilot User
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Carousel>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Col>
    </React.Fragment>
  );
};
export default CarouselPage;
