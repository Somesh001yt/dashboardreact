import { type } from "@testing-library/user-event/dist/type";
import { UPDATE_DEPARTMENT_FAILURE , UPDATE_DEPARTMENT_SUCCESS  , DELETE_DEPARTMENT_FAILURE , DELETE_DEPARTMENT_SUCCESS} from "./actionTypes";

export const updateDepartmentSuccess = (message) => ({
    type : UPDATE_DEPARTMENT_SUCCESS,
    payload : message,
});

export const updateDepartmentFailure = (message) => ({
    type : UPDATE_DEPARTMENT_FAILURE,
    payload : message,
});

export const deleteDepartmentSuccess = (message) => {
    console.log(message)
 return {
    type : DELETE_DEPARTMENT_SUCCESS,
    payload : message,
 }
}

export const deleteDepartmentFailure = (error) => ({
    type : DELETE_DEPARTMENT_FAILURE,
    payload : error,
})

