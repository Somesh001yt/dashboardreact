import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { isEmpty } from "lodash";
import TableContainer from "../../Components/Common/TableContainer";
import * as Yup from "yup";
import { useFormik } from "formik";

//import components
import Breadcrumbs from "../../Components/Common/Breadcrumb";
import DeleteModal from "../../Components/Common/DeleteModal";

import {
  No,
  SoftwareName,
  StartDate,
  EndDate,
  Category,
  LicenseFile,
  Description,
  NumberOfUsers,
} from "./softwarelist";

//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";

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
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import Spinners from "../../Components/Common/Spinner";
import { ToastContainer } from "react-toastify";
import EditModal from "../../Components/softwareEditModal.js";
import { API } from "../../Api/Api.js";

const softwareData = [
  {
    id: 1,
    softwareName: "Google",
    startDate: "	2023-11-08",
    endDate: "	2024-12-08",
    description: "This is a software",
    users: 10,
  },
];

const ManageSoftware = () => {
  const [modal, setModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(true);
  const [software, setSoftware] = useState(softwareData);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const token = localStorage.getItem("token");

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {},
    validationSchema: Yup.object({}),
    onSubmit: (values) => {
      addSoftwareFunction(values);
    },
  });

  const addSoftwareFunction = async (data) => {
    try {
      const response = await API.addSoftware(data, token);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleModal = (state) => {
    console.log(state);
    if (state === "edit") {
      setIsEdit(true);
    } else {
      setIsEdit(false);
    }

    validation.resetForm();
  };

  const handleAddUser = () => {
    toggleModal("add");

    setIsEditModalOpen(true);
  };

  const onClickDelete = (job) => {
    console.log(job);
    // setJob(job);
    setDeleteModal(true);
  };

  const handleModal = () => {
    if (modal) {
      setModal(false);
    } else {
      setModal(true);
    }
    // validation.resetForm();
  };

  const handleEditClick = (arg, data) => {
    toggleModal("edit");
    setIsEditModalOpen(true);
  };

  const handleDeletejob = () => {};

  const columns = useMemo(
    () => [
      {
        Header: "No",
        accessor: "id",
        filterable: true,
        Cell: (cellProps) => {
          return <No {...cellProps} />;
        },
      },
      {
        Header: "Software Name",
        accessor: "softwareName",
        filterable: true,
        Cell: (cellProps) => {
          return <SoftwareName {...cellProps} />;
        },
      },
      {
        Header: "Start Date",
        accessor: "startDate",
        filterable: true,
        Cell: (cellProps) => {
          return <StartDate {...cellProps} />;
        },
      },
      {
        Header: "End Date",
        accessor: "endDate",
        filterable: true,
        Cell: (cellProps) => {
          return <EndDate {...cellProps} />;
        },
      },
      {
        Header: "LicenseFile",
        accessor: "licenseFile",
        filterable: true,
        Cell: (cellProps) => {
          return <LicenseFile {...cellProps} />;
        },
      },
      {
        Header: "Description",
        accessor: "description",
        Cell: (cellProps) => {
          return <Description {...cellProps} />;
        },
      },
      {
        Header: "NumberOfUsers",
        accessor: "users",
        Cell: (cellProps) => {
          return <NumberOfUsers {...cellProps} />;
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
    ],
    []
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
            <Breadcrumbs breadcrumbItem="Manage Softwares" />
            <Row>
              <Col lg="12">
                <Card>
                  <CardBody className="border-bottom">
                    <div className="d-flex align-items-center">
                      <h5 className="mb-0 card-title flex-grow-1">
                        Software List
                      </h5>
                      <div className="flex-shrink-0">
                        <Link
                          to="#!"
                          onClick={() => handleModal()}
                          className="btn btn-primary me-4"
                        >
                          Add Category
                        </Link>
                        <Link
                          to="#!"
                          onClick={() => handleAddUser()}
                          className="btn btn-primary me-1"
                        >
                          Add Software
                        </Link>
                        <Link to="#!" className="btn btn-light me-2">
                          <i className="mdi mdi-refresh"></i>
                        </Link>
                      </div>
                    </div>
                  </CardBody>
                  <CardBody>
                    <TableContainer
                      columns={columns}
                      data={software || []}
                      isGlobalFilter={true}
                      isAddOptions={false}
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
              <Modal isOpen={modal} toggle={handleModal}>
              <ModalHeader toggle={handleModal} tag="h4">
                Add Category
              </ModalHeader>
              <ModalBody>
                <Form
                  onSubmit={(e) => {
                    e.preventDefault();
                   
                  }}
                >
                  <Row>
                    <Col className="col-12">
                      <div className="mb-3">
                        <Label className="form-label"> Add Category</Label>
                        <Input
                          name="category"
                          type="text"
                          placeholder="Add Category Here"
                          validate={{
                            required: { value: true },
                          }}
                          // onChange={validation.handleChange}
                          // onBlur={validation.handleBlur}
                          // value={validation?.values?.title || null}
                          // invalid={
                          //   validation.touched.title && validation.errors.title
                          //     ? true
                          //     : false
                          // }
                        />
                        {/* {validation.touched.title && validation.errors.title ? (
                          <FormFeedback type="invalid">
                            {validation?.errors?.title}
                          </FormFeedback>
                        ) : null} */}
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
            
          </div>
        </div>
      </div>
      <EditModal
              isEdit={isEdit}
              isOpen={isEditModalOpen}
                validation={validation}
              toggled={() => {
                setIsEditModalOpen(false);
              }}
            />
      <ToastContainer />
    </React.Fragment>
  );
};

export default ManageSoftware;
