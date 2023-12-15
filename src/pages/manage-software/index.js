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
  Spinner,
} from "reactstrap";
import { toast } from "react-toastify";
import EditModal from "../../Components/softwareEditModal.js";
import { API } from "../../Api/Api.js";
import moment from "moment";

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
  const [softwareList, setSoftwareList] = useState([]);
  const [selectFile, setSelectFile] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [job, setJob] = useState(null);
  const token = localStorage.getItem("token");
  const [softwareId, setSoftwareId] = useState();
  const [softId, setSoftId] = useState([]);
  const [softDetails, setSoftDetails] = useState({});
  const [loader, setLoader] = useState(false);
  const [loading, setLoading] = useState(false);

  const softwareOption = [
    { id: "1", title: "apple" },
    { id: "2", title: "microsoft" },
    { id: "3", title: "safari" },
    { id: "4", title: "indigo" },
  ];

  const getSoftwareValue = () => {
    return softwareOption?.map((item) => ({
      label: item.title,
      value: item.id,
    }));
  };



  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      SoftwareName: isEdit ? softDetails && softDetails?.SoftwareName : "",
      StartDate: isEdit ? (softDetails && moment(softDetails.StartDate).format("yyyy-MM-DD")) || null : null,
      EndDate: isEdit ? (softDetails && moment(softDetails.EndDate).format("yyyy-MM-DD")) || null : null,
      Category: isEdit
        ? softDetails &&
          getSoftwareValue().find((item) => item.value === softDetails?.Category)
        : '',
      LicenseFile: isEdit ? softDetails && softDetails?.LicenseFile : "",
      Description: isEdit ? softDetails && softDetails?.Description : "",
      NumberOfUsers: isEdit ? softDetails && softDetails?.NumberOfUsers : "",
    },
    validationSchema: Yup.object({
      SoftwareName: Yup.string()
        .required("Please enter you software name")
        .trim(),
      StartDate: Yup.date()
        .required("Start Date is required")
        .typeError("Invalid date format"),
      EndDate: Yup.date()
        .required("End Date is required")
        .typeError("Invalid date format")
        .min(
          Yup.ref("StartDate"),
          "End Date must be greater than or equal to Start Date"
        ),
      Description: Yup.string().required("Please provide some description"),
      NumberOfUsers: Yup.string().required("Please enter number of users"),
    }),
    onSubmit: (values) => {
      addOrEdit(values);
    },
  });


   console.log(getSoftwareValue()[0].label , 'fn');

  //  Add Software Api Function

  const addSoftwareFunction = async (data) => {
    data["Category"] = softwareId?.value;
    data["LicenseFile"] = selectFile;
  

    try {
      setLoading(true);
      const response = await API.addSoftware(data, token);
      console.log(response);
      if (response?.success) {
        toast.success(response?.message);
        setIsEditModalOpen(false);
        getSoftwareListFunction();
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

  /// Get Software List Api function

  const getSoftwareListFunction = async () => {
    setLoader(true);
    try {
      const response = await API.getSoftwareList(token);
      console.log(response);
      if (response?.success) {
        setSoftwareList(response?.softwareList);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  // Get Software List Details APi

  const getSoftwareDetailsFunction = async (id) => {
    try {
      setLoading(true);
      const response = await API.getSoftwareDetails(token, id);
      console.log(response);
      setSoftDetails(response?.softwareDetails);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  console.log(softDetails ,'ssss');

  


  useEffect(() => {
    getSoftwareListFunction();
  }, []);

  // Update Sote Api function

  const updateSoftwareFunction = async (data) => {
    const newClassId =  softwareId?.value !== undefined ? softwareId.value : data?.Category;
    console.log(data?.Category)
    data["Category"] = newClassId;
    data["LicenseFile"] = selectFile;
    let id = softId;


    try {
      setLoading(true);
      const response = await API.updateSoftware(data, token, id);
      console.log(response);
      if (response?.success) {
        toast.success(response?.message);
        setIsEditModalOpen(false);
        getSoftwareListFunction();
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

  //  Delete Software Api function

  const deleteSoftwareFunction = async () => {
    try {
      setLoading(true);
      const response = await API.deleteSoftware(token, job?.SoftwareID);
      console.log(response);
      if (response.success) {
        toast.success(response?.message);
        setDeleteModal(false);
        getSoftwareListFunction();
      } else {
        toast.error(response?.message);
      }
    } catch (error) {
      toast.error("Network Error");
    } finally {
      setLoading(false);
    }
  };

  const addOrEdit = (data) => {
    console.log(isEdit);
    if (isEdit) {
      updateSoftwareFunction(data);
    } else {
      addSoftwareFunction(data);
    }
  };

  const softwareOptions = softwareOption?.map((item) => ({
    label: item?.title,
    value: item?.id,
  }));

  const handleClassIdChange = (selectedOption) => {
    console.log('Selected Option:', selectedOption);
  
    if (selectedOption) {
      setSoftwareId(selectedOption);
      validation.setFieldValue("Category", selectedOption);
    } else {
      setSoftwareId('');
      validation.setFieldValue("Category", '');
    }
    
  };
  

  const toggleModal = (state) => {
    console.log(state , 'state');
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
    setJob(job);
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
    getSoftwareDetailsFunction(data?.original?.SoftwareID);
    setSoftId(data?.original?.SoftwareID);
    setIsEditModalOpen(true);
  };

  const handleDeletejob = () => {
    deleteSoftwareFunction();
    if (job && job.id) {
      setDeleteModal(false);
    }
  };

  const columns = useMemo(
    () => [
      {
        Header: "Software Name",
        accessor: "SoftwareName",
        filterable: true,
        Cell: (cellProps) => {
          return <SoftwareName {...cellProps} />;
        },
      },
      {
        Header: "Start Date",
        accessor: "StartDate",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <span>
              {moment(cellProps?.row?.original?.StartDate)?.format(
                "yyyy-MM-DD"
              )}
            </span>
          );
        },
      },
      {
        Header: "End Date",
        accessor: "EndDate",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <span>
              {moment(cellProps?.row?.original?.EndDate)?.format("yyyy-MM-DD")}
            </span>
          );
        },
      },
      {
        Header: "LicenseFile",
        accessor: "LicenseFile",
        filterable: true,
        Cell: (cellProps) => {
          return <LicenseFile {...cellProps} />;
        },
      },
      {
        Header: "Description",
        accessor: "Description",
        Cell: (cellProps) => {
          return <Description {...cellProps} />;
        },
      },
      {
        Header: "Category",
        accessor: "Category",
        Cell: (cellProps) => {
          const categoryValue = cellProps?.row?.original?.Category;
          const categoryLabel = getSoftwareValue().find((item) => item.value === categoryValue)?.label;
      
          return <span>{categoryLabel}</span>;
        },
      },
      {
        Header: "NumberOfUsers",
        accessor: "NumberOfUsers",
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
        loading={loading}
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
                  {loader ? (
                    <Spinner
                      style={{ margin: "15px auto", color: "#00395C" }}
                    />
                  ) : "" || softwareList?.length === 0 || !softwareList ? (
                    <div className="text-center mb-4 mt-4">No data list</div>
                  ) : (
                    <CardBody>
                      <TableContainer
                        columns={columns}
                        data={softwareList || []}
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
                  )}
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
        softwareData={softwareOptions}
        selectedFile={setSelectFile}
        loading={loading}
        onSoftwareClick={handleClassIdChange}
        toggled={() => {
          setIsEditModalOpen(false);
        }}
      />
    </React.Fragment>
  );
};

export default ManageSoftware;
