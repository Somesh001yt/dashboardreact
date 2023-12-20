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
  BlogUrlName , Url , PostedDate, Authorized
} from "./softwareUrls.js";

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
import EditUrlModal from "../../Components/urlsEditmodal/index.js";


const ManageBlockUrls = () => {
  
  const [blogUrlData, setBlogUrlData] = useState([]);
  const [isSubscribed, setIsSubscribed] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [subUserList, setSubUserList] = useState([]);
  const [loader , setLoader] = useState(false)
  const [urlId , setUrlId] = useState()
  const [userId , setUserId] = useState([])
  const [deleteModal , setDeleteModal] = useState(false)
  const [job, setJob] = useState(null);

  const urlOption = [
    { id: "1", title: "public" },
    { id: "2", title: "private" },
    { id: "3", title: "specific" },
  
  ];




//   const getSoftwareValue = () => {
//     return softwareOption?.map((item) => ({
//       label: item.title,
//       value: item.id,
//     }));
//   };
const getSpecificUser = subUserList?.map((item)=> ({
    value :  item?.id,
    label : item?.username 
 }))


  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      Name: "",
      URL: "",
      Date: "",
      Authorized: "",  // Set it to the desired number
  },
  
    validationSchema: Yup.object({
        Name: Yup.string()
        .required("Please enter you software name")
        .trim(),
        URL:  Yup.string().required('Please enter your url'),
      Date: Yup.date()
      .required(" Date is required")
      .typeError("Invalid date format"),
     
    }),
    onSubmit: (values) => {
    console.log(values , 'val')
    addBlogUrlFunction(values)
   
    },
  });

  console.log(validation.errors)

  const token = localStorage.getItem('token')


   /// get blog url api function 

   const getBlogUrlFunction = async () => {
    try{
   const response = await API.getBlogUrl(token)
   console.log(response)
   if(response?.success){
    setBlogUrlData(response?.blogUrlList)
   }
    }catch (error){
      console.log(error)
    }
  }


  useEffect(()=>{
    getBlogUrlFunction()
  },[])

  
  /// add blog url api funciton

  const addBlogUrlFunction = async (data) => {
    data['Authorized'] = urlId?.value;
  
   
    if (data['Authorized'] === '3') {
       let str = ''
       userId?.map((me , i)=>{
          // str = str + me?.value + (",")
          console.log(me?.value, 'sss')
          str = str + me?.value + (i === userId.length - 1 ? '' : ',');
          console.log(str, 'sss')
         })

      data['child_id'] = str;
    } else {
      data['child_id'] = null; 
    }
  
    try {
      const response = await API.addBlogUrl(data, token);
      console.log(response);
  
      if (response?.success) {
        toast.success(response?.message);
        setIsEditModalOpen(false);
        getBlogUrlFunction();
      } else {
        toast.error(response?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  


 

  const getSubUserListApi = async () => {
    setLoader(true)
    try {
      const response = await API.getUserList(token);
      console.log(response)
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


  useEffect(()=>{
    getSubUserListApi()
  },[])




  const toggleModal = (state) => {
    console.log(state, "state");
    if (state === "edit") {
      setIsEdit(true);
    } else {
      setIsEdit(false);
    }

    // validation.resetForm();
  };

  const handleAddUser = () => {
    toggleModal("add");

    setIsEditModalOpen(true);
  };

  const handleEditClick = (arg, data) => {
    toggleModal("edit");
   
    setIsEditModalOpen(true);
  };

  const urlsOptions = urlOption?.map((item) => ({
      value: item?.id,
      label: item?.title,
  }));
 
  const handleUrlChange = (selectedOption) => {
    console.log('sel', selectedOption)
    
    setSelectedCategory(selectedOption);

    if (!isEditModalOpen) {
        setSelectedCategory(null);
      }

      if (selectedOption) {
        setUrlId(selectedOption);
        // validation.setFieldValue("Category", selectedOption);
      } else {
        setUrlId("");
        // validation.setFieldValue("Category", "");
      }
  }

  const onClickDelete = (job) => {
    console.log(job);
    setJob(job);
    setDeleteModal(true);
  };

  const handleDeletejob = () => {
    // deleteSoftwareFunction();
    if (job && job.id) {
      setDeleteModal(false);
    }
  };


  const handleSpecificUser = (selectedUser) => {

    setUserId(selectedUser)

    // let str = ""

    // selectedUser?.map((me , i)=>{
    //   str = str + me?.value + (",")
    // })

    // console.log(str,"jnh")

  };
  
  
  

  console.log(userId)

  const columns = useMemo(
    () => [
      {
        Header: "Blog Url Name",
        accessor: "Name",
        filterable: true,
        Cell: (cellProps) => {
          return <BlogUrlName {...cellProps} />;
        },
      },
      {
        Header: "Url",
        accessor: "URL",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <Url {...cellProps} />
          );
        },
      },
      {
        Header: "Posted Date",
        accessor: "Date",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <span>
              {moment(cellProps?.row?.original?.Date)?.format("yyyy-MM-DD")}
            </span>
          );
        },
      },
      {
        Header: "Authorized",
        accessor: "Authorized",
        filterable: true,
        Cell: (cellProps) => {
          return <Authorized {...cellProps} />;
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
        // loading={loading}
         onDeleteClick={handleDeletejob}
         onCloseClick={() => setDeleteModal(false)}
      />
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <Breadcrumbs breadcrumbItem="Manage Urls" />
            <Row>
              <Col lg="12">
                <Card>
                  <CardBody className="border-bottom">
                    <div className="d-flex align-items-center">
                      <h5 className="mb-0 card-title flex-grow-1">
                        Url List
                      </h5>
                      <div className="flex-shrink-0">
                        <Link
                          to="#!"
                          onClick={() => handleAddUser()}
                          className="btn btn-primary me-1"
                        >
                          Add Urls
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
                        data={ blogUrlData || []}
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
          </div>
        </div>
      </div>
      <EditUrlModal
        isEdit={isEdit}
        isOpen={isEditModalOpen}
        toggled={() => {
            setIsEditModalOpen(false);
          }}
          validation={validation}
        urlsOptions ={urlsOptions}
        specificUserOption={getSpecificUser}
        onUrlClick={handleUrlChange}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedUser={selectedUser}
        handleSpecificUser={handleSpecificUser}
      />
    </React.Fragment>
  );
};

export default ManageBlockUrls;
