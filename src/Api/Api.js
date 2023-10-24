import instance from "../AxiosProvider/axiosInstance";

export const API = {
  async getUserLogin(params) {
    try {
      const response = await instance.post("auth/login", {
        ...params,
      });
      console.log(response);
      return response?.data;
    } catch (error) {
      console.log("error", error);

      return error.data;
    }
  },

  async registerUserType(params) {
    try {
      const response = await instance.post("auth/register", {
        ...params,
      });
      console.log(response);
      return response?.data;
    } catch (error) {
      console.log(error);
    }
  },

  async forgotPassword(params) {
    try {
      const response = await instance.post("auth/forgot-password", {
        ...params,
      });
      console.log(response);
      return response?.data;
    } catch (error) {
      console.log(error);
    }
  },


  async resetPassword(params) {
  
    try {
      const response = await instance.post("auth/reset-password", {
        ...params,
      });
      console.log(response);
      return response?.data;
    } catch (error) {
      console.log(error);
    }
  },
};
