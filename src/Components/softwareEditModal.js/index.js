import React, { useState , useRef, useEffect } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  Row,
  Col,
  Label,
  Input,
  FormFeedback,
  Spinner,
} from "reactstrap";
import Select from "react-select";

const EditModal = ({
    isEdit,
    isOpen,
    toggle
}) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
    <ModalHeader toggle={toggle} tag="h4">
      {isEdit ? "Edit " : "Add "}
    </ModalHeader>
    <ModalBody>
    
      <Form
        // validationSchema={validation.validationSchema}
        onSubmit={(e) => {
        //   e.preventDefault();
        //   validation.handleSubmit();

          // addOrEdit(validation.values); // Call addOrEdit with form values

          // toggle();
          return false;
        }}
      >
       

        <Row>
          <Col className="col-12">
            
            <div className="mb-3">
              <Label className="form-label"> Full Name</Label>
              <Input
                name="username"
                type="text"
                placeholder="Insert your full name"
                // validate={{
                //   required: { value: true },
                // }}
                // onChange={validation.handleChange}
                // onBlur={validation.handleBlur}
                // value={validation.values.username || ""}
                // invalid={
                //   validation.touched.username && validation.errors.username
                //     ? true
                //     : false
                // }
              />
              {/* {validation.touched.username && validation.errors.username ? (
                <FormFeedback type="invalid">
                  {validation.errors.username}
                </FormFeedback>
              ) : null} */}
            </div>
            <div className="mb-3">
              <Label className="form-label">Email Address</Label>
              <Input
                name="email"
                type="email"
                placeholder="Insert your email"
                // validate={{
                //   required: { value: true },
                // }}
                // onChange={validation.handleChange}
                // onBlur={validation.handleBlur}
                // value={validation.values.email || ""}
                // invalid={
                //   validation.touched.email && validation.errors.email
                //     ? true
                //     : false
                // }
              />
              {/* {validation.touched.email && validation.errors.email ? (
                <FormFeedback type="invalid">
                  {validation.errors.email}
                </FormFeedback>
              ) : null} */}
            </div>
            <div className="mb-3">
              <Label className="form-label">Address</Label>
              <Input
                name="address"
                type="text"
                placeholder="Insert yout address"
                // onChange={validation.handleChange}
                // onBlur={validation.handleBlur}
                // value={validation.values.address || ""}
                // invalid={
                //   validation.touched.address && validation.errors.address
                //     ? true
                //     : false
                // }
              />
              {/* {validation.touched.address && validation.errors.address ? (
                <FormFeedback type="invalid">
                  {validation.errors.address}
                </FormFeedback>
              ) : null} */}
            </div>
            <div className="mb-3">
              <Label className="form-label">Contact Number</Label>
              <Input
                name="phone"
                placeholder="Insert your phone number"
                type="text"
                // onChange={validation.handleChange}
                // onBlur={validation.handleBlur}
                // value={validation.values.phone || ""}
                // invalid={
                //   validation.touched.phone && validation.errors.phone
                //     ? true
                //     : false
                // }
              />
              {/* {validation.touched.phone && validation.errors.phone ? (
                <FormFeedback type="invalid">
                  {validation.errors.phone}
                </FormFeedback>
              ) : null} */}
            </div>

            <div className="mb-3">
              <Label className="form-label">Password</Label>
              <div className="input-group auth-pass-inputgroup">
                <Input
                  name="password"
                  type={ "text"}
                  placeholder="Insert your password here"
                //   onChange={validation.handleChange}
                //   onBlur={validation.handleBlur}
                //   value={validation.values.password || ""}
                //   invalid={
                //     validation.touched.password && validation.errors.password
                //       ? true
                //       : false
                //   }
                />
                {/* <button
                  onClick={() => setPasswordShow(!passwordShow)}
                  className="btn btn-light"
                  style={{ backgroundColor: passwordShow ? "#b7c4d5" : "" }}
                  type="button"
                  id="password-addon"
                >
                  <i className="mdi mdi-eye-outline"></i>
                </button> */}
                {/* {validation.touched.password && validation.errors.password ? (
                  <FormFeedback type="invalid">
                    {validation.errors.password}
                  </FormFeedback>
                ) : null} */}
              
              </div>
            </div>
          </Col>
        </Row>

        <Row>
          <Col>
            <div className="text-end">
              <button
                type="submit"
                className="btn btn-primary save-user"
                // disabled={loading}
              >
                Save
              </button>
            </div>
          </Col>
        </Row>
      </Form>
    </ModalBody>
  </Modal>

  )
}

export default EditModal