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

  async confirmEmail(params) {
    try {
      const response = await instance.post("auth/activate", {
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

  async getMyProfile(token) {
    try {
      const response = await instance.get("user/profile", {
        headers: {
          "x-access-token": token,
        },
      });
      console.log(response);
      return response?.data;
    } catch (error) {
      console.log(error);
    }
  },

  async updateProfile(params, token) {
    let formData = new FormData();
    formData.append("profileImage", params?.profileImage);
    formData.append("username", params?.username);
    formData.append("phone", params?.phone);
    formData.append("address", params?.address);

    console.log(params);
    try {
      const response = await instance.post(
        "user/update-profile",

        formData,

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

  async userUpdatePassword(params, token) {
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
  },

  async getDepartementList(params, token) {
    try {
      const response = await instance.get("class", {
        headers: {
          "x-access-token": token,
        },
      });
      console.log(response);
      return response?.data;
    } catch (error) {
      console.log(error);
    }
  },

  async updateDepartmentList(params, token, id) {
    try {
      const response = await instance.put(
        `class/${id}`,
        { ...params },
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

  async addDepartmentList(params, token) {
    console.log(params, "me");

    try {
      const response = await instance.post(
        "class",
        { ...params },
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

  async deleteDepartmentList(token, id) {
    try {
      const response = await instance.delete(`class/${id}`, {
        headers: {
          "x-access-token": token,
        },
      });
      console.log(response);
      return response?.data;
    } catch (error) {
      console.log(error);
    }
  },

  async getUserList(token) {
    try {
      const response = await instance.get("subUser", {
        headers: {
          "x-access-token": token,
        },
      });
      console.log(response);
      return response?.data;
    } catch (error) {
      console.log(error);
    }
  },

  async addSubUserList(params, token) {
    let formData = new FormData();
    formData.append("profileImage", params?.profileImage);
    formData.append("username", params?.username);
    formData.append("phone", params?.phone);
    formData.append("address", params?.address);
    formData.append("email", params?.email);
    formData.append("classId", params?.classId);
    formData.append("password", params?.password);

    try {
      const response = await instance.post("subUser", formData, {
        headers: {
          "x-access-token": token,
        },
      });
      console.log(response);
      return response?.data;
    } catch (error) {
      console.log(error);
    }
  },

  async getSubUserDetails(token, id) {
    try {
      const response = await instance.get(`subUser/${id}`, {
        headers: {
          "x-access-token": token,
        },
      });
      console.log(response);
      return response?.data;
    } catch (error) {
      console.log(error);
    }
  },

  async updateSubUser(params, token, id) {
    let formData = new FormData();
    formData.append("username", params?.username);
    formData.append("phone", params?.phone);
    formData.append("address", params?.address);
    formData.append("email", params?.email);
    formData.append("password", params?.password);

    if (params?.profileImage !== "") {
      formData.append("profileImage", params?.profileImage);
    }

    formData.append("classId", params?.classId);

    console.log(params);

    try {
      const response = await instance.put(`subUser/${id}`, formData, {
        headers: {
          "x-access-token": token,
        },
      });
      console.log(response);
      return response?.data;
    } catch (error) {
      console.log(error);
    }
  },

  async deleteSubUser(token, id) {
    try {
      const response = await instance.delete(`subUser/${id}`, {
        headers: {
          "x-access-token": token,
        },
      });
      console.log(response);
      return response?.data;
    } catch (error) {
      console.log(error);
    }
  },

  async addSoftware(params, token) {
    let formData = new FormData();

    formData.append("SoftwareName", params?.SoftwareName);
    formData.append("StartDate", params?.StartDate);
    formData.append("EndDate", params?.EndDate);
    formData.append("Category", params?.Category);
    formData.append("LicenseFile", params?.LicenseFile);
    formData.append("Description", params?.Description);
    formData.append("NumberOfUsers", params?.NumberOfUsers);

    try {
      const response = await instance.post("addSoftware", formData, {
        headers: {
          "x-access-token": token,
        },
      });
      console.log(response);
      return response?.data;
    } catch (error) {
      console.log(error);
    }
  },

  async getSoftwareList(token) {
    try {
      const response = await instance.get("softwareList", {
        headers: {
          "x-access-token": token,
        },
      });
      console.log(response);
      return response?.data;
    } catch (error) {
      console.log(error);
    }
  },

  async getSoftwareDetails(token, id) {
    try {
      const response = await instance.get(`softwareDetail/${id}`, {
        headers: {
          "x-access-token": token,
        },
      });
      console.log(response);
      return response?.data;
    } catch (error) {
      console.log(error);
    }
  },

  async updateSoftware(params, token, id) {
    let formData = new FormData();

    formData.append("SoftwareName", params?.SoftwareName);
    formData.append("StartDate", params?.StartDate);
    formData.append("EndDate", params?.EndDate);
    formData.append("Category", params?.Category);
    formData.append("Description", params?.Description);
    formData.append("NumberOfUsers", params?.NumberOfUsers);
    // formData.append("LicenseFile", params?.LicenseFile);

    if (params?.LicenseFile !== "") {
      formData.append("LicenseFile", params?.LicenseFile);
    }

    try {
      const response = await instance.put(`softwareUpdate/${id}`, formData, {
        headers: {
          "x-access-token": token,
        },
      });
      console.log(response);
      return response?.data;
    } catch (error) {
      console.log(error);
    }
  },

  async deleteSoftware(token, id) {
    try {
      const response = await instance.delete(`softwareDelete/${id}`, {
        headers: {
          "x-access-token": token,
        },
      });
      console.log(response);
      return response?.data;
    } catch (error) {
      console.log(error);
    }
  },

  async getSoftwareCategoryList(token) {
    try {
      const response = await instance.get("softwareCategoryList", {
        headers: {
          "x-access-token": token,
        },
      });
      console.log(response);
      return response?.data;
    } catch (error) {
      console.log(error);
    }
  },

  async addBlogUrl(params, token) {
    try {
      const response = await instance.post(
        "addUrl",
        { ...params },
        {
          headers: {
            "x-access-token ": token,
          },
        }
      );
      console.log(response);
      return response?.data;
    } catch (error) {
      console.log(error);
    }
  },

  async getBlogUrl(token) {
    try {
      const response = await instance.get("blogUrlList", {
        headers: {
          "x-access-token": token,
        },
      });
      console.log(response);
      return response?.data;
    } catch (error) {
      console.log(error);
    }
  },

  async updateBlogUrl(params, token, id) {
    try {
      const response = await instance.put(
        `update-Blog-Url/${id}`,
        { ...params },
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

  async getBlogListDetails(token, id) {
    try {
      const response = await instance.get(`detailBlogUrl/${id}`, {
        headers: {
          "x-access-token": token,
        },
      });
      console.log(response);
      return response?.data;
    } catch (error) {
      console.log(error);
    }
  },

  async deleteBlogUrl(token, id) {
    try {
      const response = await instance.delete(`deleteBlogUrl/${id}`, {
        headers: {
          "x-access-token": token,
        },
      });
      console.log(response);
      return response?.data;
    } catch (error) {
      console.log(error);
    }
  },
};
