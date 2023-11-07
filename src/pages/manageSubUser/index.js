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
import { API } from "../../Api/Api";
import { toast } from "react-toastify";
import Select from "react-select";
import EditModal from "../../Components/EditModal";
import moment from "moment";

const ManageSubUser = () => {
  const selectLayoutState = useSelector((state) => state.Layout.layoutModeType);
  const [isSubscribed, setIsSubscribed] = useState(true);
  const [deleteModal, setDeleteModal] = useState(false);
  const [modal, setModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [subUserList, setSubUserList] = useState([]);
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(false);
  const [subUserDetail, setSubUserDetail] = useState({});
  const [departmentList, setDepartmentList] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [departmentId, setDepartmentId] = useState();
  const [subUserId, setSubUserId] = useState([]);

  const dispatch = useDispatch();

  const token = localStorage.getItem("token");

  useEffect(() => {
    getSubUserListApi();
  }, [token]);

  const getSubUserListApi = async () => {
    setLoading(true)
    try {
      const response = await API.getUserList(token);
      if (response?.success) {
        setSubUserList(response?.data);
        setLoading(false)
      }
    } catch (error) {
      console.log(error);
      
    }finally{
      setLoading(false)
    }
  };

  const getSubUserDetailsApi = async (id) => {
    try {
      setLoading(true);
      const response = await API.getSubUserDetails(token, id);
      console.log(response, "xxxx");
      setSubUserDetail(response?.data[0]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getDepartementListApi = async (data) => {
    try {
      const response = await API.getDepartementList(data, token);
      console.log(response);
      setDepartmentList(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addSubUserListApi = async (data) => {
    data["classId"] = departmentId?.value;
    console.log(departmentId);
    try {
      setLoading(true);
      const response = await API.addSubUserList(data, token);
      console.log(response);
      if (response?.success) {
        toast.success(response?.message);
        setIsEditModalOpen(false);
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

  const updateSubUserApi = async (data) => {
    console.log(data);
    let id = subUserId;
    console.log(id);
    try {
      setLoading(true);
      const response = await API.updateSubUser(data, token, id);
      console.log(response);
      if (response?.success) {
        toast.success(response?.message);
        setIsEditModalOpen(false);
        getSubUserListApi();
      } else {
        toast.error(response?.message);
      }
    } catch (error) {
      toast.error("Network Error");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteSubUserApi = async () => {
    try {
      setLoading(true);
      const response = await API.deleteSubUser(token, job?.id);
      console.log(response);
      if (response.success) {
        toast.success(response?.message);
        getSubUserListApi();
      } else {
        toast.error(response?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Network Error");
    } finally {
      setLoading(false);
    }
  };

  const addOrEdit = (data) => {
    console.log(isEdit);
    if (isEdit) {
      const { classId, ...dataWithoutClassId } = data;
      updateSubUserApi(dataWithoutClassId);
    } else {
      addSubUserListApi(data);
    }
  };

  const initialValues = {
    username: "",
    email: "",
    phone: "",
    address: "",
    profileImage: "",
    classId: "",
  };

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      username: isEdit ? subUserDetail && subUserDetail?.username : "",
      email: isEdit ? subUserDetail && subUserDetail?.email_address : "",
      phone: isEdit ? subUserDetail && subUserDetail?.phone_number : "",
      address: isEdit ? subUserDetail && subUserDetail?.address : "",
      profileImage: isEdit ? subUserDetail && subUserDetail?.profile_image : "",
      classId: isEdit ? subUserDetail && subUserDetail?.className : "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Please enter your name").trim(),
      email: Yup.string()
        .matches(
          /^[A-Za-z0-9_%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
          "Invalid email format"
        )
        .required("Please enter your email"),
      address: Yup.string().required("Please enter your address").trim(),
      phone: Yup.string().required("Please enter your phone").trim(),
      password: Yup.string()
        .matches(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[-\/:-@\[-`{-~]).{8,}$/,
          "Your password should contain a combination of uppercase and lowercase letters, at least one number, and at least one special character."
        )
        .required("Please enter your password"),
    }),
    onSubmit: (values) => {
      addOrEdit(values);
      toggle();
    },
  });

  // const handleFormSubmit = (values) => {
  //   addOrEdit(values);
  //   toggle();
  // };

  const departmentOptions = departmentList?.map((department) => ({
    label: department?.title,
    value: department?.id,
  }));

  const handleClassIdChange = (selectedOption) => {
    setDepartmentId(selectedOption);
    validation.setFieldValue("classId", selectedOption);
  };

  const handleTheme = (theme) => {
    if (theme === "light") {
      setIsSubscribed(true);
    } else {
      setIsSubscribed(false);
    }
  };

  useEffect(() => {
    getDepartementListApi();
  }, []);

  useEffect(() => {
    handleTheme(selectLayoutState);
  }, [selectLayoutState]);

  const handleAddUser = () => {
    toggleModal("add");

    setIsEditModalOpen(true);
  };

  const onClickDelete = (job) => {
    console.log(job);
    setJob(job);
    setDeleteModal(true);
  };

  const handleEditClick = (arg, data) => {
    console.log(arg);
    // console.log(data?.original);

    // setSubUserDetail(data?.original);
    setSubUserId(arg);
    setIsEditModalOpen(true);

    getSubUserDetailsApi(arg);

    toggleModal("edit");
  };

  const handleDeletejob = (id) => {
    deleteSubUserApi();
    if (job && job.id) {
      setDeleteModal(false);
    }
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
      setJob(null);
    } else {
      setModal(true);
    }
    // validation.resetForm();
  };

  const columns = useMemo(
    () => [
      {
        Header: "User Name",
        accessor: "username",
        filterable: false,
        Cell: (cellProps) => {
          return <FirstName {...cellProps} />;
        },
      },
      {
        Header: "Email",
        accessor: "email_address",
        filterable: false,
        Cell: (cellProps) => {
          return <Email {...cellProps} />;
        },
      },
      {
        Header: "Address",
        accessor: "address",
        filterable: false,
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
        Cell: (cellProps) => {
          return <span> {cellProps?.row?.original?.profile_image}</span>;
        },
      },
      {
        Header: "Posted Date",
        accessor: "created_date",
        Cell: (cellProps) => {
          return (
            <span>
              {moment(cellProps?.row?.original?.created_date)?.format(
                "yyyy-MM-DD"
              )}
            </span>
          );
        },
      },
      {
        Header: "Class Name",
        // accessor: 'className',
        Cell: (cellProps) => {
          return <span> {cellProps?.row?.original?.className}</span>;
        },
      },

      {
        Header: "Action",
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
                  onClick={() =>
                    handleEditClick(
                      cellProps?.row?.original?.id,
                      cellProps?.row
                    )
                  }
                  id={`edittooltip-${cellProps?.row?.original?.id}`}
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
        loading={loading}
        onDeleteClick={handleDeletejob}
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
                  {loading ? (
                    <Spinner style={{ margin: "15px auto" }} />
                  ) : "" || subUserList?.length === 0 || !subUserList ? (
                    <div className="text-center mb-4 mt-4">No data list</div>
                  ) : (
                    <CardBody>
                      <TableContainer
                        columns={columns}
                        data={subUserList || []}
                        isAddOptions={false}
                        isGlobalFilter={true}
                        // handleJobClicks={handleEditClick}
                        // isJobListGlobalFilter={true}
                        isPagination={true}
                        iscustomPageSizeOptions={true}
                        isShowingPageLength={true}
                        customPageSize={5}
                        tableClass="table-bordered align-middle nowrap mt-2"
                        paginationDiv="col-sm-12 col-md-7"
                        pagination="pagination justify-content-end pagination-rounded"
                      />
                    </CardBody>
                  )}
                </Card>
              </Col>
            </Row>
            <EditModal
              isOpen={isEditModalOpen}
              toggle={() => setIsEditModalOpen(false)}
              validation={validation}
              isEdit={isEdit}
              loading={loading}
              // handleFormSubmit={handleFormSubmit}
              departmentOptions={departmentOptions}
              onClassIdChange={handleClassIdChange}
              // addOrEdit={addOrEdit}
              initialValues={initialValues}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ManageSubUser;
