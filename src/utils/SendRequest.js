import axios from "axios";
import toast from "react-hot-toast";

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
      payload: response.data.data
    };
  } catch (error) {
    const message = error?.response?.data?.error || error.message || "Something went wrong";
    toast.error(message);
    return message;
  }
};

export default SendRequest;
