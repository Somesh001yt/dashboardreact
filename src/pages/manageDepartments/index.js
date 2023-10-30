import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import TableContainer from "../../Components/Common/TableContainer";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import './manageDepartment.scss'

//import components
import Breadcrumbs from "../../Components/Common/Breadcrumb";
import DeleteModal from "../../Components/Common/DeleteModal";

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
} from "reactstrap";
import Spinners from "../../Components/Common/Spinner";
import { ToastContainer } from "react-toastify";
import { listData } from "./listData";
import { API } from "../../Api/Api";
import Spinner from "../../Components/Common/Spinner";
import { useSelector } from "react-redux";

const JobNoTitle = (cell) => {
  return (
    <React.Fragment>
      <Link to="#" className="text-body fw-bold">
        {cell.value ? cell.value : ""}
      </Link>
    </React.Fragment>
  );
};

const ManageDepartment = () => {
  const [modal, setModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const userDataString = localStorage.getItem("userData");

  const UserData = JSON.parse(userDataString);

  const [loading, setLoader] = useState(false);

  const [modalState, setModalstate] = useState("add");

  const [departmentData, setDepartmentData] = useState([]);
  const [job, setJob] = useState(null);

  const selectLayoutState = useSelector((state) => state.Layout.layoutModeType);
  const [isSubscribed, setIsSubscribed] = useState(true);

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
  
  console.log(selectLayoutState , "xxx");
  
  console.log(isSubscribed , 'xxx')

 

  let userTypeName =
    UserData.user_type === "education"
      ? "Class"
      : UserData.user_type === "corporate"
      ? "Deaprtment"
      : "Users";

  const token = localStorage.getItem("token");

  // validation
  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      title: isEdit ? (job && job.title) : '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Please Enter Your Job Title").trim(),
    }),
    onSubmit: (values) => {
      addOrEdit(values);
      toggle();
      // validation.resetForm();
    },
  });

  useEffect(() => {
    getDepartementListData();
  }, [token]);

  // get List Api

  const getDepartementListData = async (data) => {
    console.log(data);
    try {
      const response = await API.getDepartementList(data, token);
      console.log(response);
      setDepartmentData(response?.data);
    } catch (error) {
      console.log(error);
    }
  };


  // Add List Api

  const addOrEdit = (data) => {
    if (isEdit) {
      updateDepartementData(data);
    } else {
      AddDepartmentList(data);
    }
  };

  const AddDepartmentList = async (data) => {
    setLoader(true);
    try {
      
      const response = await API.addDepartmentList(data, token);
      console.log(response);
      if (response.success) {
        toast.success(response?.message);
        getDepartementListData();
      } else {
        toast.error(response?.message);
      }
    } catch (error) {
      toast.error("Network Error");
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  const updateDepartementData = async (data) => {
    console.log(data, job, "sasdasdsd");
    setLoader(true);
    try {
      const response = await API.updateDepartmentList(data, token, job?.id);
      console.log(response);
      if (response?.success) {
        toast.success(response?.message);
        getDepartementListData();
      } else {
        console.log({ response });
        toast.error(response?.message);
      }
    } catch (error) {
      toast.error("Network Error");
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  const deleteDepartmentData = async () => {
    console.log(token, job, "sasdasdsd");
    setLoader(true);
    try {
      const response = await API.deleteDepartmentList(token, job?.id);
      console.log(response);
      if (response.success) {
        toast.success(response?.message);
        getDepartementListData();
      } else {
        toast.error(response?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Network Error");
    } finally {
      setLoader(false);
    }
  };

  const handleJobClick = (arg) => {
    const job = arg;
    setJob({
      id: job.id,
      title: job.title,
    });

    setIsEdit(true);

    toggleModal("edit");
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




  const [deleteModal, setDeleteModal] = useState(false);
  

  const onClickDelete = (job) => {
    setJob(job);
    setDeleteModal(true);
  };

  const handleDeletejob = (id) => {
    deleteDepartmentData();
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

  const columnList = useMemo(
    () => [
            {
        Header: "Title",
        accessor: "title",
        filterable: true,
        Cell: (cellProps) => {
          return <JobNoTitle {...cellProps} />;
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
                  className={`btn btn-sm ${isSubscribed ? 'btn-soft-primary' : 'btn-primary'}`}

                  
                  onClick={() => {
                    const jobData = cellProps.row.original;
                    handleJobClick(jobData);
                   
                  
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
        onDeleteClick={handleDeletejob}
        onCloseClick={() => setDeleteModal(false)}
      />
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <Breadcrumbs breadcrumbItem={"Manage " + userTypeName} />

            <Row>
              <Col lg="12">
                <Card>
                  <CardBody>
                    <div className="d-flex align-items-center">
                      <h5 className="mb-0 card-title flex-grow-1"> </h5>
                      <div className="flex-shrink-0">
                        <Link
                          to="#!"
                          onClick={() => toggleModal("add")}
                          className="btn btn-primary me-1"
                        >
                          {UserData.user_type === "education"
                            ? "Add Class"
                            : UserData.user_type === "corporate"
                            ? "Add Deaprtment"
                            : "Add Users"}
                        </Link>
                        <Link to="#!" className="btn btn-light me-1">
                          <i className="mdi mdi-refresh"></i>
                        </Link>
                      </div>
                    </div>
                    {departmentData.length === 0 ? (
                      <div className="text-center mt-4">No data found</div>
                    ) :   
                    <TableContainer
                      columns={columnList}
                      data={departmentData}
                      isGlobalFilter={true}
                      isAddOptions={false}
                      // isJobListGlobalFilter={true}
                      isPagination={true}
                      iscustomPageSizeOptions={true}
                      isShowingPageLength={true}
                      customPageSize={5}
                      tableClass="table-bordered align-middle nowrap mt-2"
                      paginationDiv="col-sm-12 col-md-7"
                      pagination="pagination justify-content-end pagination-rounded"
                    /> 
                    }
                  </CardBody>
                </Card>
              </Col>
            </Row>

            <Modal isOpen={modal} toggle={toggle}>
              <ModalHeader toggle={toggle} tag="h4">
                {!!isEdit ? `Edit ${userTypeName}` : `Add ${userTypeName}`}
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
                        <Label className="form-label"> Title</Label>
                        <Input
                          name="title"
                          type="text"
                          placeholder="Insert Title"
                          validate={{
                            required: { value: true },
                          }}
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.title || null}
                          invalid={
                            validation.touched.title && validation.errors.title
                              ? true
                              : false
                          }
                        />
                        {validation.touched.title && validation.errors.title ? (
                          <FormFeedback type="invalid">
                            {validation.errors.title}
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

export default ManageDepartment;
