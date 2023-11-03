// EditModal.js

import React, { useState } from "react";
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
  isOpen,
  toggle,
  isEdit,
  validation,
  loading,
  departmentOptions,
  onClassIdChange,
}) => {


  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle} tag="h4">
        {isEdit ? "Edit " : "Add "}
      </ModalHeader>
      <ModalBody>
        <Form
          validationSchema={validation.validationSchema}
          onSubmit={(e) => {
            e.preventDefault();
            validation.handleSubmit();
          
            // addOrEdit(validation.values); // Call addOrEdit with form values
          
            // toggle();
            return false;
          }}
        >
          <Row>
            <Col className="col-12">
              <div className="mb-3">
                <Label className="form-label"> First Name</Label>
                <Input
                  name="username"
                  type="text"
                  placeholder="Insert your first name"
                  validate={{
                    required: { value: true },
                  }}
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.username || ""}
                  invalid={
                    validation.touched.username && validation.errors.username
                      ? true
                      : false
                  }
                />
                {validation.touched.username && validation.errors.username ? (
                  <FormFeedback type="invalid">
                    {validation.errors.username}
                  </FormFeedback>
                ) : null}
              </div>
              <div className="mb-3">
                <Label className="form-label">Email</Label>
                <Input
                  name="email"
                  type="email"
                  placeholder="Insert your email"
                  validate={{
                    required: { value: true },
                  }}
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.email || ""}
                  invalid={
                    validation.touched.email && validation.errors.email
                      ? true
                      : false
                  }
                />
                {validation.touched.email && validation.errors.email ? (
                  <FormFeedback type="invalid">
                    {validation.errors.email}
                  </FormFeedback>
                ) : null}
              </div>
              <div className="mb-3">
                <Label className="form-label">Address</Label>
                <Input
                  name="address"
                  type="text"
                  placeholder="Insert yout address"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.address || ""}
                  invalid={
                    validation.touched.address && validation.errors.address
                      ? true
                      : false
                  }
                />
                {validation.touched.address && validation.errors.address ? (
                  <FormFeedback type="invalid">
                    {validation.errors.address}
                  </FormFeedback>
                ) : null}
              </div>
              <div className="mb-3">
                <Label className="form-label">Phone</Label>
                <Input
                  name="phone"
                  placeholder="Insert Location"
                  type="text"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.phone || ""}
                  invalid={
                    validation.touched.phone && validation.errors.phone
                      ? true
                      : false
                  }
                />
                {validation.touched.phone && validation.errors.phone ? (
                  <FormFeedback type="invalid">
                    {validation.errors.phone}
                  </FormFeedback>
                ) : null}
              </div>

              <div className="mb-3">
                <Label className="form-label">Password</Label>
                <Input
                  name="password"
                  type="password"
                  placeholder="Insert Experience"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.password || ""}
                  invalid={
                    validation.touched.password && validation.errors.password
                      ? true
                      : false
                  }
                />
                {validation.touched.password && validation.errors.password ? (
                  <FormFeedback type="invalid">
                    {validation.errors.password}
                  </FormFeedback>
                ) : null}
              </div>
              <div className="mb-3">
                <Label className="form-label">Profile Image</Label>
                <Input
                  name="profileImage"
                  type="file"
                  accept="image/jpeg , image/png , image/webp"
                  placeholder="Insert Position"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  invalid={
                    validation.touched.profileImage &&
                    validation.errors.profileImage
                      ? true
                      : false
                  }
                />
                {validation.touched.profileImage &&
                validation.errors.profileImage ? (
                  <FormFeedback type="invalid">
                    {validation.errors.profileImage}
                  </FormFeedback>
                ) : null}
              </div>
              {!isEdit && (
                <div className="mb-3">
                  <Label className="form-label">Class Id</Label>
                  <Select
                    className="select2-selection"
                    name="classId"
                    type="text"
                    onChange={onClassIdChange}
                    options={departmentOptions}
                    placeholder="Insert Position"
                    required  
                    onBlur={departmentOptions?.value}
                    value={validation.values.classId || ""}
                    // value={departmentId}
                    invalid={
                      validation.touched.classId && validation.errors.classId
                        ? true
                        : false
                    }
                  />
                </div>
              )}
              {/* Display the selected file name separately */}
              {validation.touched.classId && validation.errors.classId ? (
                <FormFeedback type="invalid">
                  {validation.errors.classId}
                </FormFeedback>
              ) : null}
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="text-end">
                <button type="submit" className="btn btn-primary save-user" disabled={loading}>
                  {loading ? <Spinner size={"sm"} /> : "Save"}
                </button>
              </div>
            </Col>
          </Row>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default EditModal;
