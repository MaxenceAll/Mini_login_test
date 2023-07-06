import axios from "axios";
import config from "../config";

const axiosInstance = axios.create({
  baseURL: config.api.url,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const fetcher = {};

fetcher.get = async (endpoint, params = {}, headers = {}) => {
  try {
    const response = await axiosInstance.get(endpoint, {
      params,
      headers: { ...axiosInstance.defaults.headers, ...headers },
    });
    return response?.data;
  } catch (error) {
    console.error(error);
    return {
      data: null,
      result: false,
      message: error?.response?.data?.message,
      error: error?.message,
    };
  }
};

fetcher.post = async (endpoint, data = {}, headers = {}) => {
  try {
    const response = await axiosInstance.post(endpoint, data, {
      headers: { ...axiosInstance.defaults.headers, ...headers },
    });
    return response?.data;
  } catch (error) {
    console.error(error);
    return {
      data: null,
      result: false,
      message: error?.response?.data?.message,
      error: error?.message,
    };
  }
};

fetcher.put = async (endpoint, data = {}, headers = {}) => {
  try {
    const response = await axiosInstance.put(endpoint, data, {
      headers: { ...axiosInstance.defaults.headers, ...headers },
    });
    return response?.data;
  } catch (error) {
    console.error(error);
    return {
      data: null,
      result: false,
      message: error?.response?.data?.message,
      error: error?.message,
    };
  }
};

fetcher.patch = async (endpoint, data = {}, headers = {}) => {
  try {
    const response = await axiosInstance.patch(endpoint, data, {
      headers: { ...axiosInstance.defaults.headers, ...headers },
    });
    return response?.data;
  } catch (error) {
    console.error(error);
    return {
      data: null,
      result: false,
      message: error?.response?.data?.message,
      error: error?.message,
    };
  }
};

fetcher.delete = async (endpoint, params = {}, headers = {}) => {
  try {
    const response = await axiosInstance.delete(endpoint, {
      params,
      headers: { ...axiosInstance.defaults.headers, ...headers },
    });
    return response?.data;
  } catch (error) {
    console.error(error);
    return {
      data: null,
      result: false,
      message: error?.response?.data?.message,
      error: error?.message,
    };
  }
};

export default fetcher;
