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
import avatar from "../../assets/images/profile.png"

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
  const [loader, setLoader] = useState(false);
  const [subUserDetail, setSubUserDetail] = useState({});
  const [departmentList, setDepartmentList] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [departmentId, setDepartmentId] = useState();
  const [subUserId, setSubUserId] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [subUserImg , setSubUserImg] = useState(null)
  const [resetImage , setResetImage] = useState(false)


  const dispatch = useDispatch();

  const token = localStorage.getItem("token");

  const initialValues = {
    username: "",
    email: "",
    phone: "",
    address: "",
    classId : ""
  };

 
  

  const getClassValue = () => {
    return departmentList?.map((item) => ({
      label: item.title,
      value: item.id
    }));
  };
  

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      username: isEdit ? subUserDetail && subUserDetail?.username : "",
      email: isEdit ? subUserDetail && subUserDetail?.email_address : "",
      phone: isEdit ? subUserDetail && subUserDetail?.phone_number : "",
      address: isEdit ? subUserDetail && subUserDetail?.address : "",
      // profileImage: isEdit ? subUserDetail && subUserDetail?.profile_image : "",
      classId: isEdit
      ? subUserDetail && getClassValue().find(item => item.value === subUserDetail.class_id)
      : getClassValue()[0],
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
     
      //  classId: Yup.string().required("Please select at least one class")

    }),
    onSubmit: (values) => {
      addOrEdit(values);
      toggle();
    },
  });


  useEffect(() => {
    getSubUserListApi();
  }, [token]);

  const getSubUserListApi = async () => {
    setLoader(true)
    try {
      const response = await API.getUserList(token);
      if (response?.success) {
        setSubUserList(response?.data);
        setLoader(false)
      }
    } catch (error) {
      console.log(error);
      
    }finally{
      setLoader(false)
    }
  };

  const getSubUserDetailsApi = async (id) => {
    try {
      setLoading(true);
      const response = await API.getSubUserDetails(token, id);
      console.log(response?.data[0].profile_image, "xxxx");
      setSubUserImg(response?.data[0].profile_image,)
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
      setDepartmentList(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addSubUserListApi = async (data) => {
    data["classId"] = departmentId?.value;
    data["profileImage"] = selectedImage
    console.log(data)
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
    const newClassId = departmentId?.value !== undefined ? departmentId.value : data?.classId;

    data["classId"] = newClassId
    data["profileImage"] = selectedImage
    console.log(selectedImage, "selec");
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


  const handleImageChange = (image) => { 
    console.log(image,"sen");
    setSelectedImage(image);
    console.log(selectedImage, 'ss')
   
  };

  const toggleModal = (state) => {
    console.log(state)
    if (state === "edit") {
      setIsEdit(true);

      toggle();
    } else {
      setIsEdit(false);
      toggle();
    }

    validation.resetForm();
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
    
        toggleModal("edit");
    getSubUserDetailsApi(arg);
    console.log(arg);
    console.log(data?.original);

    // setSubUserDetail(data?.original);
     setSubUserId(arg);
    setIsEditModalOpen(true);

     
  };

  const handleDeletejob = (id) => {
    deleteSubUserApi();
    if (job && job.id) {
      setDeleteModal(false);
    }
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
        Header: "Profile Image",
        Cell: (cellProps) => {
          const profileImage = cellProps?.row?.original?.profile_image;
          return (
            <img
              src={profileImage ? `http://oursitedemo.com:4002/images/logo/${profileImage}` : avatar}
              alt="Profile"
              className="avatar-md rounded-circle img-thumbnail "
            />
          );
        },
      }
,      
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
                  {loader ? (
                    <Spinner style={{ margin: "15px auto", color:'#00395C'}} />
                  ) : "" || subUserList?.length === 0 || !subUserList ? (
                    <div className="text-center mb-4 mt-4">No data list</div>
                  ) : (
                    <CardBody>
                      <TableContainer
                        columns={columns}
                        data={subUserList || []}
                        isAddOptions={false}
                        isGlobalFilter={true}
                       
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
              toggle={() => {setIsEditModalOpen(false) 
                setResetImage(false)}}
              validation={validation}
              resetImage={resetImage}
              isEdit={isEdit}
              loading={loading}
              // handleFormSubmit={handleFormSubmit}
              departmentOptions={departmentOptions}
              onClassIdChange={handleClassIdChange}
              // addOrEdit={addOrEdit}
              initialValues={initialValues}
              onImageChange={(e)=>handleImageChange(e)}
              imageData = {subUserImg}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ManageSubUser;
