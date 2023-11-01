import React, { useEffect, useMemo, useState } from "react";
import Breadcrumbs from "../../Components/Common/Breadcrumb";

import {
  Col,
  Row,
  UncontrolledTooltip,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  Input,
  FormFeedback,
  Label,
  Card,
  CardBody,
  Spinner,
} from "reactstrap";
import DeleteModal from "../../Components/Common/DeleteModal";

// import { jobs } from "../../../common/data";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  FirstName,
  Email,
  Address,
  Phone,
  Password,
  ProfileImage,
  ClassName,
  PostedDate,
  action,
} from "./JobListCol";

import TableContainer from "../../Components/Common/TableContainer";
import JobList from "../JobPages/JobList";
import { listData } from "./listData";
import { API } from "../../Api/Api";
import { toast } from "react-toastify";
import Select from "react-select";

const ManageSubUser = () => {
  const selectLayoutState = useSelector((state) => state.Layout.layoutModeType);
  const [isSubscribed, setIsSubscribed] = useState(true);
  const [deleteModal, setDeleteModal] = useState(false);
  const [modal, setModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [subUserList, setSubUserList] = useState(listData);
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedGroup, setselectedGroup] = useState(null);
  const [departmentList, setDepartmentList] = useState([]);
  const [departmentId, setDepartmentId] = useState();

  const dispatch = useDispatch();

  const token = localStorage.getItem("token");

  useEffect(() => {
    getSubUserListApi();
  }, [token]);

  const getSubUserListApi = async () => {
    try {
      const response = await API.getUserList(token);
      console.log(response);
      if (response?.success) {
        setSubUserList(response?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };


  const getSubUserDetailsApi = async () => {
    try{
    const response = await API.getSubUserDetails(token , job?.id)
    console.log(response)
    } catch (error){
        console.log(error)
    }
  }

  const getDepartementListApi = async (data) => {
    console.log(data);
    try {
      const response = await API.getDepartementList(data, token);
      console.log(response);
      setDepartmentList(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addOrEdit = (data) => {
    if (isEdit) {
        getSubUserDetailsApi(data);
    } else {
        addSubUserListApi(data);
    }
  };
  

  const departmentOptions = departmentList.map((department) => ({
    label: department?.title,
    value: department?.id,
  }));

  const addSubUserListApi = async (data) => {
    data["classId"] = departmentId;
    try {
      setLoading(true);
      const response = await API.addSubUserList(data, token);
      console.log(response);
      if (response?.success) {
        toast.success(response?.message);
        getSubUserListApi();
      } else {
        toast.error(response?.message);
      }
    } catch (error) {
      toast.message("Network Error");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
    username: isEdit ? job && job.username : "",
    email: isEdit ? job && job.email : "",
    phone: isEdit ? job && job.phone : "",
    address: isEdit ? job && job.address : "",
    username: isEdit ? job && job.username : "",
    profileImage : isEdit ? job && job.profile_image : '',
    classId : isEdit ? job && job.classId : ''

    },
    validationSchema: Yup.object({
        username: Yup.string().required("Please Enter Your Name").trim(),
        email : Yup.string().required("Please Enter Your Email").trim(),
        address : Yup.string().required("Please Enter Your Address").trim(),
        phone : Yup.string().required("Please Enter Your Phone").trim(),
    }),
    onSubmit: (values) => {
      console.log(values);
      addSubUserListApi(values);
      toggle();
    },
  });

  const handleTheme = (theme) => {
    if (theme === "light") {
      setIsSubscribed(true);
    } else {
      setIsSubscribed(false);
    }
  };

  useEffect(() => {
    handleTheme(selectLayoutState);
  }, [selectLayoutState]);

  const handleAddUser = () => {
    setModal(true);
    getDepartementListApi();
  };

  const onClickDelete = (job) => {
    // setJob(job);
    setDeleteModal(true);
  };

  const handleEditClick = (arg) => {

    const data = arg;
    setJob({
      id: data.id,
      username: data.username,
      email : data.email_address,
      address: data.address,
      phone: data.phone_number,
      profileImage :data.profile_image,
      classId: data.classId
    });

    console.log(job)

    setIsEdit(true);

    toggleModal("edit");

    getSubUserDetailsApi();
  };

  const toggleModal = (state) => {
    if (state === "edit") {
      setIsEdit(true);
      toggle();
    } else {
      setIsEdit(false);
      toggle();
    }

    validation.resetForm();
  };

  const toggle = () => {
    if (modal) {
      setModal(false);
      // setJob(null);
    } else {
      setModal(true);
    }
  };

//   function handleSelectGroup(selectedGroup) {
//     setselectedGroup(selectedGroup);
//     setDepartmentId(selectedGroup?.id);
//   }

  const columns = useMemo(
    () => [
      {
        Header: "User Name",
        accessor: "username",
        filterable: true,
        Cell: (cellProps) => {
          return <FirstName {...cellProps} />;
        },
      },
      {
        Header: "Email",
        accessor: "email_address",
        filterable: true,
        Cell: (cellProps) => {
          return <Email {...cellProps} />;
        },
      },
      {
        Header: "Address",
        accessor: "address",
        filterable: true,
        Cell: (cellProps) => {
          return <Address {...cellProps} />;
        },
      },
      {
        Header: "Phone",
        accessor: "phone_number",
        filterable: true,
        Cell: (cellProps) => {
          return <Phone {...cellProps} />;
        },
      },
      {
        Header: "Profile Image",
        accessor: "profile_image",
        Cell: (cellProps) => {
          return <ProfileImage {...cellProps} />;
        },
      },
      {
        Header: "Posted Date",
        accessor: "created_date",
        Cell: (cellProps) => {
          return <PostedDate {...cellProps} />;
        },
      },
      {
        Header: "Class Name",
        accessor: "className",
        Cell: (cellProps) => {
          return <ClassName {...cellProps} />;
        },
      },

      {
        Header: "Action",
        accessor: "action",
        disableFilters: true,
        Cell: (cellProps) => {
          return (
            <ul className="list-unstyled hstack gap-1 mb-0">
              <li>
                <Link
                  to="#"
                  className={`btn btn-sm ${
                    isSubscribed ? "btn-soft-primary" : "btn-primary"
                  }`}
                  onClick={() => {
                    const editData = cellProps.row.original;
                    handleEditClick(editData);
                  }}
                  id={`edittooltip-${cellProps.row.original.id}`}
                >
                  <i className="mdi mdi-pencil-outline" />
                  <UncontrolledTooltip
                    placement="top"
                    target={`edittooltip-${cellProps.row.original.id}`}
                  >
                    Edit
                  </UncontrolledTooltip>
                </Link>
              </li>

              <li>
                <Link
                  to="#"
                  className="btn btn-sm btn-soft-danger"
                  onClick={() => {
                    const jobData = cellProps.row.original;
                    onClickDelete(jobData);
                  }}
                  id={`deletetooltip-${cellProps.row.original.id}`}
                >
                  <i className="mdi mdi-delete-outline" />
                  <UncontrolledTooltip
                    placement="top"
                    target={`deletetooltip-${cellProps.row.original.id}`}
                  >
                    Delete
                  </UncontrolledTooltip>
                </Link>
              </li>
            </ul>
          );
        },
      },
    ],
    [isSubscribed]
  );
  return (
    <React.Fragment>
      <DeleteModal
        show={deleteModal}
        // onDeleteClick={handleDeletejob}
        onCloseClick={() => setDeleteModal(false)}
      />
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <Breadcrumbs breadcrumbItem={"Manage SubUsers"} />
            <Row>
              <Col lg="12">
                <Card>
                  <CardBody className="border-bottom">
                    <div className="d-flex align-items-center">
                      <h5 className="mb-0 card-title flex-grow-1">
                        Sub User Lists
                      </h5>
                      <div className="flex-shrink-0">
                        <Link
                          to="#!"
                          onClick={handleAddUser}
                          className="btn btn-primary me-1"
                        >
                          Add New User
                        </Link>
                        <Link to="#!" className="btn btn-light me-1">
                          <i className="mdi mdi-refresh"></i>
                        </Link>
                      </div>
                    </div>
                  </CardBody>
                  <CardBody>
                    <TableContainer
                      columns={columns}
                      data={subUserList}
                      isAddOptions={false}
                      handleJobClicks={handleEditClick}
                      isJobListGlobalFilter={true}
                      isPagination={true}
                      iscustomPageSizeOptions={true}
                      isShowingPageLength={true}
                      customPageSize={5}
                      tableClass="table-bordered align-middle nowrap mt-2"
                      paginationDiv="col-sm-12 col-md-7"
                      pagination="pagination justify-content-end pagination-rounded"
                    />
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <Modal isOpen={modal} toggle={toggle}>
              <ModalHeader toggle={toggle} tag="h4">
                {!!isEdit ? "Edit " : "Add "}
              </ModalHeader>
              <ModalBody>
                <Form
                  onSubmit={(e) => {
                    e.preventDefault();
                    validation.handleSubmit();
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
                        {validation.touched.email_address &&
                        validation.errors.email ? (
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
                            validation.touched.address &&
                            validation.errors.address
                              ? true
                              : false
                          }
                        />
                        {validation.touched.address &&
                        validation.errors.address ? (
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
                        {validation.touched.phone_number &&
                        validation.errors.phone ? (
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
                            validation.touched.password &&
                            validation.errors.password
                              ? true
                              : false
                          }
                        />
                        {validation.touched.password &&
                        validation.errors.password ? (
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
                      <div className="mb-3">
                        <Label className="form-label">Class Id</Label>
                        <Select
                          className="select2-selection"
                          name="classId"
                          type="text"
                          onChange={(selectedOption) => {
                            const selectedDepartmentId = selectedOption.value;
                            setDepartmentId(selectedDepartmentId);
                          }}
                          options={departmentOptions}
                          placeholder="Insert Position"
                          onBlur={validation.handleBlur}
                          value={validation.values.classId}
                          invalid={
                            validation.touched.classId &&
                            validation.errors.classId
                              ? true
                              : false
                          }
                        />
                      </div>
                      {/* Display the selected file name separately */}
                      {validation.touched.classId &&
                      validation.errors.classId ? (
                        <FormFeedback type="invalid">
                          {validation.errors.classId}
                        </FormFeedback>
                      ) : null}
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <div className="text-end">
                        <button
                          type="submit"
                          className="btn btn-primary save-user"
                        >
                          {loading ? <Spinner size={"sm"} /> : "Save"}
                        </button>
                      </div>
                    </Col>
                  </Row>
                </Form>
              </ModalBody>
            </Modal>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ManageSubUser;
