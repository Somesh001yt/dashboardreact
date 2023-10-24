import axios from 'axios'


const instance = axios.create({
    baseURL: "http://oursitedemo.com:4002/api/",
   timeout: 1000000,
   
 });

 instance.interceptors.response.use(response  => {
    return response
  }, error => {
    console.log('error',error);
    return error.response
  
    // return Promise.reject()
  
  }
  )

  export default instance;
 