// EditModal.js

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
import avatar from "../../assets/images/profile.png";


const EditModal = ({
  isOpen,
  toggle,
  isEdit,
  validation,
  loading,
  departmentOptions,
  onClassIdChange,
  onImageChange,
  imageData , 
  resetImage
}) => {
  const [passwordShow, setPasswordShow] = useState(false);
  const [image, setImage] = useState(null);
  const inputRef = useRef(null);
  const apiUrl = process.env.REACT_APP_API_URL;
  // useEffect(()=>{
  //   setImage(null)
  // },[resetImage])


  const onSelectedFiles = (event) => {
    const selectedFiles = event.target.files[0]; 
        console.log(selectedFiles,"sen");
    if(selectedFiles){

      setImage(selectedFiles);
      console.log(selectedFiles)
      onImageChange(selectedFiles);
    } else{
      setImage(null) 
      onImageChange("");
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setImage(null); 
      onImageChange("");
      onClassIdChange("")
    }
  }, [isOpen]);


  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle} tag="h4">
        {isEdit ? "Edit " : "Add "}
      </ModalHeader>
      <ModalBody>
        {loading ? <Spinner style={{ margin: "60% 200px" , color:'#00395C'}} /> :  
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
              <div
                className="mb-3"
                style={{
                  position: "relative",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onClick={() => inputRef.current.click()}
              >
               {( image instanceof Blob || image instanceof File) ? ( 
                      <img
                        src={
                          image instanceof Blob || image instanceof File
                          ? URL.createObjectURL(image)
                          : `${apiUrl}/images/logo/${imageData}`
                        }
                        className="avatar-xl rounded-circle img-thumbnail"
                      />
                    ) : (
                      <img
                      src={
                        imageData !== "" && isEdit
                          ? `${apiUrl}/images/logo/${imageData}`
                          : avatar
                      }

                      className="avatar-xl rounded-circle img-thumbnail "
                      />
                    )}
                  
                <i className="fas fa-pen-square  editIcon" />
                <input
                      type="file"
                      className="d-none"
                      name="profileImage"
                      accept="image/jpeg , image/png , image/webp"
                      onChange={onSelectedFiles}
                      ref={inputRef}
                    />
              </div>
              <div className="mb-3">
                <Label className="form-label"> Full Name</Label>
                <Input
                  name="username"
                  type="text"
                  placeholder="Enter Your Full Name"
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
                <Label className="form-label">Email Address</Label>
                <Input
                  name="email"
                  type="email"
                  placeholder="Enter Your Email Address"
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
                  placeholder="Enter Your Address"
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
                <Label className="form-label">Contact Number</Label>
                <Input
                  name="phone"
                  placeholder="Enter Your Contact Number"
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
                <div className="input-group auth-pass-inputgroup">
                  <Input
                    name="password"
                    type={!passwordShow ? "password" : "text"}
                    placeholder="Enter Your Password "
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.password || ""}
                    invalid={
                      validation.touched.password && validation.errors.password
                        ? true
                        : false
                    }
                  />
                  <button
                    onClick={() => setPasswordShow(!passwordShow)}
                    className="btn btn-light"
                    style={{ backgroundColor: passwordShow ? "#b7c4d5" : "" }}
                    type="button"
                    id="password-addon"
                  >
                    <i className="mdi mdi-eye-outline"></i>
                  </button>
                  {/* {validation.touched.password && validation.errors.password ? (
                    <FormFeedback type="invalid">
                      {validation.errors.password}
                    </FormFeedback>
                  ) : null} */}
                
                </div>
              </div>

              {/* {!isEdit && ( */}
              <div className="mb-3">
                <Label className="form-label">Class</Label>
                <Select
                  className="select2-selection"
                  name="classId"
                  type="text"
                  required
                  onChange={onClassIdChange}
                  options={departmentOptions}
                  placeholder="Select Your Class"
                  onBlur={departmentOptions?.value}
                  value={validation.values.classId || ""}
                  // value={departmentId}
                  invalid={
                    validation.touched.classId && validation.errors.classId
                      ? true
                      : false
                  }
                />
                {/* {validation.touched.classId && validation.errors.classId ? (
                <FormFeedback type="invalid">
                  {validation.errors.classId}
                </FormFeedback>
              ) : null} */}
                <span
                  style={{
                    color: "red",
                    fontSize: "10px",
                    fontWeight: 100,
                    opacity: 0.8,
                  }}
                >
                  {validation.errors.classId}
                </span>
              </div>

              {/* Display the selected file name separately */}
            </Col>
          </Row>

          <Row>
            <Col>
              <div className="text-end">
                <button
                  type="submit"
                  className="btn btn-primary save-user"
                  disabled={loading}
                >
                  {loading ? <Spinner size={"sm"} /> : "Save"}
                </button>
              </div>
            </Col>
          </Row>
        </Form>
}
      </ModalBody>
    </Modal>
  );
};

export default EditModal;
