import { GET_PROFILE_DATA } from "./actionType";

const initialState = {
    profileData : [],
}


const manageProfileData = (state =  initialState, action) => {
    switch (action.type) {
        case GET_PROFILE_DATA :
            console.log(action.payload);
            return {
                ...state,
                profileData : action.payload,
            }
            default:
                return state;
    }
}

export default manageProfileData;