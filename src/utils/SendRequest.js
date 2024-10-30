import axios from "axios";

const SendRequest = async (method, url, data = {}) => {
  try {
    const token = localStorage.getItem("token") || "";
    const response = await axios({
      method,
      url: url,
      data,
      params: method === "GET" ? data : {},
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return {
      payload: response.data
    };
  } catch (error) {
    return error?.response?.data?.error || error.message || "Something went wrong";
  }
};

export default SendRequest;