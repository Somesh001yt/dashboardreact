import axios from 'axios';
import {  toast } from 'react-toastify';


const instance = axios.create({
    baseURL: "http://oursitedemo.com:4002/api/",
   timeout: 1000000,
   
 });

 instance.interceptors.response.use(response  => {
    return response
  }, error => {
    if (error.response.status === 401) {
      localStorage.removeItem('token')
         setTimeout(NavigateTimeout, 1500)
  
  
      toast.error("Your session is expried please login again.")
    }
    console.log('error',error);
    return error.response
  
    // return Promise.reject() 
  
  }
  )

  const NavigateTimeout = () => {
    window.location.replace('/login')
  
  }

  export default instance;
 