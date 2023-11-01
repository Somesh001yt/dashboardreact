import { act } from "react-dom/test-utils";
import { DELETE_APPLY_JOB_SUCCESS } from "../../jobs/actionTypes";
import { UPDATE_DEPARTMENT_FAILURE , UPDATE_DEPARTMENT_SUCCESS , DELETE_DEPARTMENT_FAILURE , DELETE_DEPARTMENT_FAILURE } from "./actionTypes";


const initialState = {
    updateSuccessMessage : null ,
    updateFailureMessage : null ,
    deleteSuccessMessage : null ,
    deleteFailureMessage : null
}

const manageDepartment = (state = initialState, action) => {
    switch (action.type) {
      case UPDATE_DEPARTMENT_SUCCESS:
        return {
          ...state,
          updateSuccessMessage: action.payload,
        };
      case UPDATE_DEPARTMENT_FAILURE:
        return {
          ...state,
          updateErrorMessage: action.payload,
        };
      case DELETE_APPLY_JOB_SUCCESS:
        console.log( 'xx' ,action.payload);
        return{
            ...state,
            deleteSuccessMessage : action.payload,
        };
        case DELETE_DEPARTMENT_FAILURE  :
            return {
                ... state,
                deleteFailureMessage : action.payload
            }
      default:
        return state;
    }
  };
  
  export default manageDepartment;