import { API_URL } from "@yeardle/constants/AppConfig";
import axios from "axios";

export const sendRequest = async (method, url, data = {}) => {
  try {
    const response = await axios({
      method: method,
      url: API_URL + url,
      data: data
    });
    return response.data;
  } catch (error) {
    return null;
  }
};
