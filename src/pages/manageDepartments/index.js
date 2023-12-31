import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import TableContainer from "../../Components/Common/TableContainer";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import "./manageDepartment.scss";

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
  Spinner,
} from "reactstrap";

import { ToastContainer } from "react-toastify";
import { API } from "../../Api/Api";

import { useSelector } from "react-redux";
import moment from "moment";
import { useTranslation } from "react-i18next";

const JobNoTitle = (cell) => {
  return (
    <React.Fragment>
      <Link to="#" className="text-body fw-bold">
        {cell?.value ? cell?.value : ""}
      </Link>
    </React.Fragment>
  );
};

const ManageDepartment = () => {
  const [modal, setModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const userDataString = localStorage.getItem("userData");
  const [error, setError] = useState(false);

  const UserData = JSON.parse(userDataString);

  const [loading, setLoading] = useState(false);
  const [loader, setLoader] = useState(false);

  const [deleteModal, setDeleteModal] = useState(false);
  const [departmentData, setDepartmentData] = useState([]);
  const [job, setJob] = useState(null);
  const {t} = useTranslation()

  

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

  let userTypeName =
    UserData?.user_type === "education"
      ? "Class"
      : UserData?.user_type === "corporate"
      ? "Department"
      : "Users";

  const token = localStorage.getItem("token");

  // validation
  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      title: isEdit ? job && job.title : "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Please enter your title").trim(),
    }),
    onSubmit: (values) => {
      addOrEdit(values);

      // validation.resetForm();
    },
  });

  useEffect(() => {
    getDepartementListData();
  }, [token]);

  // get List Api

  const getDepartementListData = async (data) => {
    setLoader(true);
    console.log(data);
    try {
      const response = await API.getDepartementList(data, token);
      console.log(response);
      setDepartmentData(response?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
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
    setLoading(true);
    try {
      const response = await API.addDepartmentList(data, token);
      console.log(response);
      if (response.success) {
        toast.success(response?.message);
        toggle();
        getDepartementListData();
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

  const updateDepartementData = async (data) => {
    console.log(data, job, "sasdasdsd");
    setLoading(true);
    try {
      const response = await API.updateDepartmentList(data, token, job?.id);
      console.log(response);
      if (response?.success) {
        toast.success(response?.message);
        getDepartementListData();
        toggle();
      } else {
        console.log({ response });
        toast.error(response?.message);
      }
    } catch (error) {
      toast.error("Network Error");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteDepartmentData = async () => {
    console.log(token, job, "sasdasdsd");
    setLoading(true);
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
      setLoading(false);
    }
  };

  const handleJobClick = (arg) => {
    const job = arg;
    setJob({
      id: job?.id,
      title: job?.title,
    });

    setIsEdit(true);

    toggleModal("edit");
  };

  const toggleModal = (state) => {
    if (state === "edit") {
      setIsEdit(true);
    } else {
      setIsEdit(false);
    }

    validation.resetForm();
    setError(false);
  };

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

 

  const columnList = useMemo(() => {
    return [
      {
        Header: `${t('addTitle')}`,
        accessor: "title",
        Cell: (cellProps) => {
          return <JobNoTitle {...cellProps} />;
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
        Header: "Action",
        // accessor: "action",
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
                    const jobData = cellProps?.row?.original;
                    toggle();

                    handleJobClick(jobData);
                  }}
                  id={`edittooltip-${cellProps?.row?.original?.id}`}
                >
                  <i className="mdi mdi-pencil-outline" />
                  <UncontrolledTooltip
                    placement="top"
                    target={`edittooltip-${cellProps?.row?.original?.id}`}
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
                    const jobData = cellProps?.row?.original;
                    onClickDelete(jobData);
                  }}
                  id={`deletetooltip-${cellProps?.row?.original?.id}`}
                >
                  <i className="mdi mdi-delete-outline" />
                  <UncontrolledTooltip
                    placement="top"
                    target={`deletetooltip-${cellProps?.row?.original?.id}`}
                  >
                    Delete
                  </UncontrolledTooltip>
                </Link>
              </li>
            </ul>
          );
        },
      },
    ];
  }, [isSubscribed , t ]);

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
            <Breadcrumbs breadcrumbItem={t('class')} />

            <Row>
              <Col lg="12">
                <Card>
                  <CardBody className="border-bottom">
                    <div className="d-flex align-items-center">
                      <h5 className="mb-0 card-title flex-grow-1">
                        {t("classlist")}
                      </h5>
                      <div className="flex-shrink-0">
                        <Link
                          to="#!"
                          onClick={() => {
                            setError(false);
                            toggle();

                            toggleModal("add");
                          }}
                          className="btn btn-primary me-1"
                        >
                        {t('add')}
                        </Link>
                        <Link to="#!" className="btn btn-light me-1">
                          <i className="mdi mdi-refresh"></i>
                        </Link>
                      </div>
                    </div>
                  </CardBody>
                  {loader ? (
                    <Spinner style={{ margin: "15px auto"  ,  color:'#00395C'}} />
                  ) : "" || departmentData?.length === 0 || !departmentData ? (
                    <div className="text-center mb-4 mt-4">No data list</div>
                  ) : (
                    <CardBody>
                      <TableContainer
                        columns={columnList}
                        data={departmentData || []}
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
                    </CardBody>
                  )}
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
                        <Label className="form-label"> {t('addTitle')}</Label>
                        <Input
                          name="title"
                          type="text"
                          placeholder={t('placeholder')}
                          validate={{
                            required: { value: true },
                          }}
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation?.values?.title || null}
                          invalid={
                            validation.touched.title && validation.errors.title
                              ? true
                              : false
                          }
                        />
                        {validation.touched.title && validation.errors.title ? (
                          <FormFeedback type="invalid">
                            {validation?.errors?.title}
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
                          disabled={loading}
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
