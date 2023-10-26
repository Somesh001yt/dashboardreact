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

  async userRegisteration(params) {
    try {
      const response = await instance.post("auth/register", {
        ...params,
      });
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

  async updateProfile(params, token) {
    console.log(params)
    let formData = new FormData();
    Array.from(params?.profileImage).forEach((image) => {
      formData.append("profileImage", image);
    });


    try {
      const response = await instance.post(
        "user/update-profile",
        {
          ...params,
        },
        {
          headers: {
            "x-access-token": token,
          },
        }
      );
      console.log(response);
      return response?.data;
    } catch (error) {
      console.log(error);
    }
  },

  async userUpdatePassword(params , token ) {
    try {
      const response = await instance.post(
        "user/update-password",
        {
          ...params,
        },
        {
          headers: {
            "x-access-token": token,
          },
        }
      );
      console.log(response);
      return response?.data;
    } catch (error) {
      console.log(error);
    }
  }
};
