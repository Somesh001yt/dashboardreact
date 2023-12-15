import React, { useState, useRef, useEffect } from "react";
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
  toggled,
  validation,
  softwareData,
  onSoftwareClick,
  selectedFile,
  loading,
}) => {
  const handleFileUpload = (event) => {
    const fileInput = event.target;
    const file = fileInput.files[0];
    console.log(file , 'file')
    if(file){
      selectedFile(file);
    }else{
      selectedFile('')
    }
    console.log(file);
  };


  useEffect(() => {
    if (!isOpen) {
      // setImage(null); 
      selectedFile("");
      onSoftwareClick('')
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} toggle={toggled}>
      <ModalHeader toggle={toggled} tag="h4">
        {isEdit ? "Edit " : "Add "}
      </ModalHeader>
      <ModalBody>
        {loading ? (
          <Spinner style={{ margin: "60% 200px", color: "#00395C" }} />
        ) : (
          <Form
            validationSchema={validation.validationSchema}
            onSubmit={(e) => {
              e.preventDefault();
              validation.handleSubmit();
              return false;
            }}
          >
            <Row>
              <Col className="col-12">
                <div className="mb-3">
                  <Label className="form-label"> Software Name</Label>
                  <Input
                    name="SoftwareName"
                    type="text"
                    placeholder="Enter Your Software Name"
                    validate={{
                      required: { value: true },
                    }}
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.SoftwareName || ""}
                    invalid={
                      validation.touched.SoftwareName &&
                      validation.errors.SoftwareName
                        ? true
                        : false
                    }
                  />
                  {validation.touched.SoftwareName &&
                  validation.errors.SoftwareName ? (
                    <FormFeedback type="invalid">
                      {validation.errors.SoftwareName}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label className="form-label">Start Date</Label>
                  <Input
                    name="StartDate"
                    type="date"
                    validate={{
                      required: { value: true },
                    }}
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.StartDate || ""}
                    invalid={
                      validation.touched.StartDate &&
                      validation.errors.StartDate
                        ? true
                        : false
                    }
                  />
                  {validation.touched.StartDate &&
                  validation.errors.StartDate ? (
                    <FormFeedback type="invalid">
                      {validation.errors.StartDate}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label className="form-label">End Date</Label>
                  <Input
                    name="EndDate"
                    type="date"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.EndDate || ""}
                    invalid={
                      validation.touched.EndDate && validation.errors.EndDate
                        ? true
                        : false
                    }
                  />
                  {validation.touched.EndDate && validation.errors.EndDate ? (
                    <FormFeedback type="invalid">
                      {validation.errors.EndDate}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label className="form-label">License File</Label>
                  <Input
                    name="LicenseFile"
                    placeholder="Add Your License File"
                    type="file"
                    onChange={handleFileUpload}
                  />
                </div>

                <div className="mb-3">
                  <Label className="form-label">Description</Label>
                  <div className="input-group auth-pass-inputgroup">
                    <Input
                      name="Description"
                      type={"text"}
                      placeholder="Enter Your Description"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.Description || ""}
                      invalid={
                        validation.touched.Description &&
                        validation.errors.Description
                          ? true
                          : false
                      }
                    />

                    {validation.touched.Description &&
                    validation.errors.Description ? (
                      <FormFeedback type="invalid">
                        {validation.errors.Description}
                      </FormFeedback>
                    ) : null}
                  </div>
                </div>
                <div className="mb-3">
                  <Label className="form-label">Category</Label>
                  <Select
                    className="select2-selection"
                    name="Category"
                    type="text"
                    // onChange={onClassIdChange}
                    onChange={onSoftwareClick}
                    options={softwareData}
                    onBlur={softwareData?.value}
                    value={validation.values.Category || ""}
                    invalid={
                      validation.touched.Category && validation.errors.Category
                        ? true
                        : false
                    }
                    placeholder="Select Your Category"
                  />
                </div>
                <div className="mb-3">
                  <Label className="form-label">Number Of Users</Label>
                  <Input
                    name="NumberOfUsers"
                    type="text"
                    placeholder="Enter Number Of User"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.NumberOfUsers || ""}
                    invalid={
                      validation.touched.NumberOfUser &&
                      validation.errors.NumberOfUsers
                        ? true
                        : false
                    }
                  />
                  {validation.touched.NumberOfUsers &&
                  validation.errors.NumberOfUsers ? (
                    <FormFeedback type="invalid">
                      {validation.errors.NumberOfUsers}
                    </FormFeedback>
                  ) : null}
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
                    {loading ? <Spinner size={"sm"} /> : "Save"}
                  </button>
                </div>
              </Col>
            </Row>
          </Form>
        )}
      </ModalBody>
    </Modal>
  );
};

export default EditModal;
