import { combineReducers } from "redux";

// Authentication
import Login from "./auth/login/reducer";
import Account from "./auth/register/reducer";
import ForgetPassword from "./auth/forgetpwd/reducer";
import Profile from "./auth/profie/reducer";

// Front
import Layout from "./layout/reducer";

//jobs
import JobReducer from "./jobs/reducer";

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
  JobReducer,
});

export default rootReducer;
