import { GET_PROFILE_DATA } from "./actionType";



export const getProfileData = (data) => ({
    type : GET_PROFILE_DATA,
    payload : data,
});