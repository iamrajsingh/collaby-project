import axios from "axios";
const BASE_URL = "https://ohkolkata.com/collably";

const apiService = {
  get: async (endpoint, requestParams) => {
    try {
      const response = await axios.get(`${BASE_URL}/${endpoint}`, {
        params: requestParams,
      });

      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  post: async (endpoint, requestBody, requestParams) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/${endpoint}`,
        requestBody,
        { params: requestParams }
      );
      return response.data;
    } catch (error) {
      throw new Error("Network error");
    }
  },
  put: async (endpoint, requestBody, requestParams) => {
    try {
      const response = await axios.put(`${BASE_URL}/${endpoint}`, requestBody, {
        params: requestParams,
      });
      return response.data;
    } catch (error) {
      throw new Error("Network error");
    }
  },
  delete: async (endpoint, requestBody, requestParams) => {
    try {
      const response = await axios.delete(
        `${BASE_URL + endpoint}`,
        requestBody,
        {
          params: requestParams,
        }
      );
      return response.data;
    } catch (error) {
      throw new Error("Network error");
    }
  },
};

export default apiService;
