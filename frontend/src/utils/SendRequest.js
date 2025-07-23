import axios from "axios";
import toast from "react-hot-toast";

// Get API base URL from environment
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

const SendRequest = async (method, url, data = {}) => {
  try {
    const token = localStorage.getItem("token") || "";

    // Prepend API base URL if url doesn't start with http
    const fullUrl = url.startsWith('http') ? url : `${API_BASE_URL}${url}`;

    const response = await axios({
      method,
      url: fullUrl,
      data,
      params: method === "GET" ? data : {},
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return {
      payload: response.data.data
    };
  } catch (error) {
    console.error(error);
    const message = error?.response?.data?.message || error.message || "Something went wrong";
    toast.error(message);
    return message;
  }
};

export default SendRequest;
