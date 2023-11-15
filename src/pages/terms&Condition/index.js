import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  Card,
  CardBody,
  Col,
  Form,
  Input,
  Label,
  Row,
} from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../Components/Common/Breadcrumb";

// import images
import img1 from "../../assets/images/small/img-2.jpg";
import avtar1 from "../../assets/images/users/avatar-2.jpg";

const TermsCondition = () => {

 const navigate = useNavigate()

 const handleNavigate = () => {
    navigate('/register')
 }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="The Track Pilot" breadcrumbItem="Terms & Condtions" />
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <div className="pt-3">
                    <div className="row justify-content-center">
                      <div className="col-xl-8">
                        <div>
                          <div className="text-center">
                            <h4>Terms and Conditions for the track pilot</h4>
                          </div>

                          <hr />
                          <p className="text-center">
                            Welcome to The Track Pilot! These terms and conditions outline
                            the rules and regulations for the use of our
                            website.
                          </p>
                          <hr />

                          <div className="mt-4">
                            <div className="text-muted font-size-14">
                              <p>
                                By accessing this website, we assume you accept
                                these terms and conditions. Do not continue to
                                use The Track Pilot if you do not agree to take all of the
                                terms and conditions stated on this page.
                              </p>

                              <p className="mb-4">
                                The following terminology applies to these Terms
                                and Conditions, Privacy Statement, and
                                Disclaimer Notice and all Agreements: "Client,"
                                "You," and "Your" refers to you, the person log
                                on this website and compliant to the Company’s
                                terms and conditions. "The Company,"
                                "Ourselves," "We," "Our," and "Us," refers to
                                our Company. "Party," "Parties," or "Us," refers
                                to both the Client and ourselves. All terms
                                refer to the offer, acceptance, and
                                consideration of payment necessary to undertake
                                the process of our assistance to the Client in
                                the most appropriate manner for the express
                                purpose of meeting the Client’s needs in respect
                                of the provision of the Company’s stated
                                services, in accordance with and subject to,
                                prevailing law of the United States. Any use of
                                the above terminology or other words in the
                                singular, plural, capitalization and/or he/she
                                or they, are taken as interchangeable and
                                therefore as referring to same.
                              </p>

                              <blockquote className="p-4 border-light border rounded mb-4">
                                <div className="d-flex">
                                  <div className="me-3">
                                    <i className="bx bxs-quote-alt-left text-dark font-size-24"></i>
                                  </div>
                                  <div>
                                    <p className="mb-0">
                                      {" "}
                                      At vero eos et accusamus et iusto odio
                                      dignissimos ducimus qui blanditiis
                                      praesentium deleniti atque corrupti quos
                                      dolores et quas molestias excepturi sint
                                      quidem rerum facilis est
                                    </p>
                                  </div>
                                </div>
                              </blockquote>

                              <h5 className="font-size-15">Cookies :</h5>
                              <p>
                                We employ the use of cookies. By accessing
                                The Track Pilot, you agreed to use cookies in agreement
                                with the Company’s Privacy Policy.
                              </p>

                              <p>
                                Most interactive websites use cookies to let us
                                retrieve the user’s details for each visit.
                                Cookies are used by our website to enable the
                                functionality of certain areas to make it easier
                                for people visiting our website. Some of our
                                affiliate/advertising partners may also use
                                cookies.
                              </p>
                            </div>

                            <hr />

                            <h5 className="font-size-15">License</h5>
                            <p>
                              Unless otherwise stated, the Company and/or its
                              licensors own the intellectual property rights for
                              all material on The Track Pilot. All intellectual property
                              rights are reserved. You may access this from
                              The Track Pilot for your own personal use subjected to
                              restrictions set in these terms and conditions.
                            </p>

                            <h6 className="font-size-14">You must not:</h6>
                            <p>
                              Republish material from The Track Pilot <br />
                              Sell, rent or sub-license material from The Track Pilot{" "}
                              <br /> Reproduce, duplicate, or copy material from
                              The Track Pilot <br />
                              Redistribute content from The Track Pilot
                            </p>

                            <hr />
                            <h5 className="font-size-15">
                              Hyperlinking to our Content
                            </h5>

                            <p>
                              These organizations may link to our home page, to
                              publications, or to other Website information so
                              long as the link: (a) is not in any way deceptive;
                              (b) does not falsely imply sponsorship,
                              endorsement, or approval of the linking party and
                              its products and/or services; and (c) fits within
                              the context of the linking party’s site.
                            </p>

                            <p>
                              If you are among the organizations listed in
                              paragraph 2 above and are interested in linking to
                              our website, you must notify us by sending an
                              email to [your email address]. Please include your
                              name, your organization name, contact information
                              as well as the URL of your site, a list of any
                              URLs from which you intend to link to our Website,
                              and a list of the URLs on our site to which you
                              would like to link. Wait 2-3 weeks for a response.
                            </p>

                            <p>
                              No use of the Company’s logo or other artwork will
                              be allowed for linking absent a trademark license
                              agreement.
                            </p>

                            <p>
                              iFrames Without prior approval and written
                              permission, you may not create frames around our
                              Webpages that alter in any way the visual
                              presentation or appearance of our Website.
                            </p>

                            <p>
                              Content Liability We shall not be held responsible
                              for any content that appears on your Website. You
                              agree to protect and defend us against all claims
                              that are rising on your Website. No link(s) should
                              appear on any Website that may be interpreted as
                              libelous, obscene, or criminal, or which
                              infringes, otherwise violates, or advocates the
                              infringement or other violation of, any third
                              party rights.
                            </p>

                            <h6>Your Privacy Please read Privacy Policy</h6>

                            <p>
                              Reservation of Rights We reserve the right to
                              request that you remove all links or any
                              particular link to our Website. You approve to
                              immediately remove all links to our Website upon
                              request. We also reserve the right to amend these
                              terms and conditions and its linking policy at any
                              time. By continuously linking to our Website, you
                              agree to be bound to and follow these linking
                              terms and conditions.
                            </p>

                            <p>
                              Removal of links from our website If you find any
                              link on our Website that is offensive for any
                              reason, you are free to contact and inform us at
                              any moment. We will consider requests to remove
                              links, but we are not obligated to or so or to
                              respond to you directly.
                            </p>

                            <p>
                              We do not ensure that the information on this
                              website is correct, we do not warrant its
                              completeness or accuracy; nor do we promise to
                              ensure that the website remains available or that
                              the material on the website is kept up to date.
                            </p>
                          </div>
                          <div className="text-end">
                                  <button
                                    type="submit"
                                    className="btn btn-primary w-sm"
                                    onClick={handleNavigate}
                                  >
                                    Submit
                                  </button>
                                </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default TermsCondition;
