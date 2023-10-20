import { combineReducers } from "redux";

// Authentication
import Login from "./auth/login/reducer";
import Account from "./auth/register/reducer";
import ForgetPassword from "./auth/forgetpwd/reducer";
import Profile from "./auth/profile/reducer";

// Front
import Layout from "./layout/reducer";

//Dasboard saas
import DashboardSaas from "./dashboard-saas/reducer";


const rootReducer = combineReducers({
  // public
  Login,
  Account,
  ForgetPassword,
  Profile,
  DashboardSaas,
  Layout,
});

export default rootReducer;
