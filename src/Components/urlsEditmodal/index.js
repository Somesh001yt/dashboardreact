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

const EditUrlModal = ({
  isEdit,
  isOpen,
  toggled,
  validation,
  onUrlClick,
  loading,
  urlsOptions,
  selectedCategory,
  setSelectedCategory,
  specificUserOption,
  handleSpecificUser,
  userValues,
  detailLoader
}) => {

    const resetSelectedCategory = () => {
        setSelectedCategory(null);
      };

    useEffect(()=>{
        if(!isOpen){
         resetSelectedCategory();
        
        }
    },[isOpen ,resetSelectedCategory])

   

  return (
    <Modal isOpen={isOpen} toggle={toggled}>
      <ModalHeader toggle={toggled} tag="h4">
        {isEdit ? "Edit " : "Add "}
      </ModalHeader>
      <ModalBody>
         {detailLoader ? (
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
                <Label className="form-label"> Blog Url Name</Label>
                <Input
                  name="Name"
                  type="text"
                  placeholder="Enter Your Blog Url Name"
                  validate={{
                    required: { value: true },
                  }}
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.Name || ""}
                  invalid={
                    validation.touched.Name &&
                    validation.errors.Name
                      ? true
                      : false
                  }
                />
                {validation.touched.Name &&
                validation.errors.Name ? (
                  <FormFeedback type="invalid">
                    {validation.errors.Name}
                  </FormFeedback>
                ) : null}
              </div>
              <div className="mb-3">
                <Label className="form-label">Url</Label>
                <Input
                  name="URL"
                  type="url"
                  validate={{
                    required: { value: true },
                  }}
                  placeholder="Enter Your Url"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.URL || ""}
                  invalid={
                    validation.touched.URL && validation.errors.URL
                      ? true
                      : false
                  }
                />
                {validation.touched.URL && validation.errors.URL ? (
                  <FormFeedback type="invalid">
                    {validation.errors.URL}
                  </FormFeedback>
                ) : null}
              </div>
              <div className="mb-3">
                <Label className="form-label">Posted Date</Label>
                <Input
                  name="Date"
                  type="date"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.Date || ""}
                  invalid={
                    validation.touched.Date &&
                    validation.errors.Date
                      ? true
                      : false
                  }
                />
                {validation.touched.Date &&
                validation.errors.Date ? (
                  <FormFeedback type="invalid">
                    {validation.errors.Date}
                  </FormFeedback>
                ) : null}
              </div>
             
              <div className="mb-3">
                <Label className="form-label">Authorized</Label>
                <Select
                  className="select2-selection"
                  name="Authorized"
                  type="text"
                  onChange={onUrlClick}
                  options={urlsOptions}
                  value={validation.values.Authorized || ""}
                  invalid={
                    validation.touched.Authorized && validation.errors.Authorized
                      ? true
                      : false
                  }
                  placeholder="Select Here"
                />
              </div>
              {(isEdit && userValues  ) || (!isEdit && selectedCategory && selectedCategory?.value === "3") ? (
                <div className="mb-3">
                  <label className="control-label">Users</label>
                  <Select
                    className="select2-selection"
                    name="child_id"
                    type="text"
                    isMulti
                    onChange={handleSpecificUser}
                    options={specificUserOption}
                    value={isEdit ?  userValues : specificUserOption?.value}
                    invalid={
                      validation.touched.child_id && validation.errors.child_id
                        ? true
                        : false
                    }
                    placeholder="Select User"
                  />
                </div>
          ) : null}
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
        )} 
      </ModalBody>
    </Modal>
  );
};

export default EditUrlModal;
