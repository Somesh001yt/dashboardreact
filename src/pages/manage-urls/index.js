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
  const [loading , setLoading] = useState(false)
  const [urlId , setUrlId] = useState()
  const [userId , setUserId] = useState([])
  const [deleteModal , setDeleteModal] = useState(false)
  const [blogDetailModal , setBlogDetailModal] = useState(false)
  const [job, setJob] = useState(null);
  const [urlDetails , setUrlDetails] = useState([])
  const [specifDetails , setSpecifiDetails] = useState([])
  const [blogId , setBlogId] = useState()

  const urlOption = [
    { id: "1", title: "public" },
    { id: "2", title: "private" },
    { id: "3", title: "specific" },
  
  ];


  const urlsOptions = urlOption?.map((item) => ({
    value: item?.id,
    label: item?.title,
}));

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

 
   useEffect(()=>{

   },[subUserList])



  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      Name: isEdit ? urlDetails && urlDetails?.Name : '',
      URL: isEdit ? urlDetails && urlDetails?.URL : '',
      Date: isEdit
      ? (urlDetails && moment(urlDetails.Date).format("yyyy-MM-DD")) ||
        null
      : null,
      Authorized:  isEdit
      ? urlDetails &&
      urlsOptions?.find((item) => item.value == urlDetails?.Authorized)
      : "", 
      child_id: ''

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
    addOrEdit(values)
   
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
          str = str + me?.value + (i === userId.length - 1 ? '' : ',');
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

  // Update Blog Url List Function

  const updateBlogUrlFunction = async (data) => {
    let id = blogId

    const newAuthorized =
    urlId?.value !== undefined
      ? urlId.value
      : typeof data?.Authorized === "object"
      ? data?.Authorized.value
      : data?.Authorized;

  data["Authorized"] = newAuthorized;

  if (data['Authorized'] === '3') {
    
     const childIds = specifDetails?.map((me) => me?.value);
     console.log(childIds, 'dsd')
    data['child_id'] = childIds.join(',');
  } else {
    data['child_id'] = null;
  }

    try {
      setLoading(true);
      const response = await API.updateBlogUrl(data, token, id);
      console.log(response);
      if (response?.success) {
        toast.success(response?.message);
        setIsEditModalOpen(false);
        getBlogUrlFunction();
      } else {
        toast.error(response?.message);
      }
    } catch (error) {
      toast.error("Network Error");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }


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


  // get blog list detail


const getBlogListDetailsFunction = async (id) => {
  try {
    setBlogDetailModal(true)
 const response = await API.getBlogListDetails(token, id )
 console.log(response?.blogDetails)
 const data = response?.blogDetails?.child_id 

 setUrlDetails(response?.blogDetails)
 setSpecifiDetailsFunc(data)


  }catch (error){
    console.log(error)
  }finally{
    setBlogDetailModal(false)
  }
}

const setSpecifiDetailsFunc = (data) =>{
  console.log(data)
  let userObj = data.split(',').map((id) => {
    console.log(id)
    const user = getSpecificUser.find((item) => item.value == id);
    console.log(user)
     return user ? { value: user.value, label: user.label } : null;
 
  })

  console.log(userObj,'xs')
  setSpecifiDetails(userObj)
}



console.log(specifDetails , 'ss')


  // delete blog url api function


  const deleteBlogUrlFunction = async () => {
    try {
      setLoading(true);
      const response = await API.deleteBlogUrl(token, job?.Id);
      console.log(response);
      if (response.success) {
        toast.success(response?.message);
        setDeleteModal(false);
        getBlogUrlFunction();
      } else {
        toast.error(response?.message);
      }
    } catch (error) {
      toast.error("Network Error");
    } finally {
      setLoading(false);
    }
  }
 



  const addOrEdit = (data) => {
    console.log(isEdit);
    if (isEdit) {
      updateBlogUrlFunction(data);
    } else {
      addBlogUrlFunction(data);
    }
  };


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
    console.log(data?.original?.Id)
    getBlogListDetailsFunction(data?.original?.Id)
    setBlogId(data?.original?.Id)
    setIsEditModalOpen(true);
  };

 
 
  const handleUrlChange = (selectedOption) => {
    console.log('sel', selectedOption)
    
    setSelectedCategory(selectedOption);

    if (!isEditModalOpen) {
        setSelectedCategory(null);
      }

      if (selectedOption) {
        setUrlId(selectedOption);
        validation.setFieldValue("Authorized", selectedOption);
      } else {
        setUrlId("");
       validation.setFieldValue("Authorized", "");
      }
  }

  const onClickDelete = (job) => {
    console.log(job , 'ss');
    setJob(job);
    setDeleteModal(true);
  };

  const handleDeletejob = () => {
    deleteBlogUrlFunction()
    if (job && job.id) { 
      setDeleteModal(false);
    }
  };

 

  const handleSpecificUser = (selectedUser) => {
    console.log(selectedUser)
  
    // setUserId(newUserValues);
  //  specifDetails(selectedCategory)

  setSpecifiDetails(selectedUser);
    console.log(selectedUser , 'ds')
    console.log(specifDetails ,'ds')
  };
  
  

 console.log(userId, 'sek')
  

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
        loading={loading}
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
        userValues={specifDetails}
        detailLoader={blogDetailModal}
      />
    </React.Fragment>
  );
};

export default ManageBlockUrls;
