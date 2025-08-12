import { API_STATUS } from "@/constants";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import Swal from "sweetalert2";
import { loadFromLocalStorage } from "./localStorage";
import qs from 'qs';

let countAuth = 0;

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  paramsSerializer: params => qs.stringify(params, { arrayFormat: 'repeat' })
});

const onRequest: any = (config: AxiosRequestConfig): AxiosRequestConfig => {
  const staffInfo = loadFromLocalStorage("staffInfo");
  const accessToken = staffInfo?.tokens?.access_token;
  const refreshToken = staffInfo?.tokens?.refresh_token;
  if (accessToken) {
    config.headers!.Authorization = `Bearer ${accessToken}`;
  }
  if (refreshToken) {
    config.headers!['refresh_token'] = refreshToken;
  }
  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  countAuth = 0;
  return response;
};

const handleResponseErrorAuth = () => {
  let arrHref = window.location.href.split("/");
  let href = `/${arrHref[arrHref.length - 1]}`;
  if (href !== "/login") {
    window.location.href = "/login";
  }
};

const handleResponseErrorPermission = () => {
  window.location.href = "/403";
};

const onResponseError = async (error: any): Promise<any> => {
  const errorResponse = error?.response;

  if (errorResponse && errorResponse.status === API_STATUS.UNAUTHORIZED) {
    handleResponseErrorAuth();
  }

  if (errorResponse && errorResponse.status === API_STATUS.FORBIDDEN) {
    // handleResponseErrorPermission();
  }

  if (
    errorResponse &&
    errorResponse.status === API_STATUS.INTERNAL_SERVER_ERROR
  ) {
    const message = errorResponse?.data?.message;
    Swal.fire({
      title: "INTERNAL SERVER ERROR",
      text: message,
      icon: "error",
    });
  }

  return Promise.reject(errorResponse);
};

// API methods
const axiosClient = {
  // GET request
  get: <Type>(url: string, params?: {}): Promise<AxiosResponse<Type>> =>
    axiosInstance.get<Type>(url, {
      params: params,
    }),

  // POST request
  post: <Type>(
    url: string,
    data?: any,
    params?: {}
  ): Promise<AxiosResponse<Type>> =>
    axiosInstance.post<Type>(url, data, { params: params }),

  // POST form request
  postForm: <Type>(url: string, data: any): Promise<AxiosResponse<Type>> =>
    axiosInstance.post<Type>(url, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),

  // PUT request
  put: <Type>(
    url: string,
    data: any,
    params?: {}
  ): Promise<AxiosResponse<Type>> =>
    axiosInstance.put<Type>(url, data, { params: params }),

  putForm: <Type>(url: string, data: any): Promise<AxiosResponse<Type>> =>
    axiosInstance.put<Type>(url, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),

  patch: <Type>(
    url: string,
    data?: any,
    params?: {}
  ): Promise<AxiosResponse<Type>> =>
    axiosInstance.patch<Type>(url, data, { params: params }),

  patchForm: <Type>(url: string, data?: any): Promise<AxiosResponse<Type>> =>
    axiosInstance.patch<Type>(url, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),

  // DELETE request
  delete: <Type>(url: string, params?: {}): Promise<AxiosResponse<Type>> =>
    axiosInstance.delete<Type>(url, { params: params }),
};

axiosInstance.interceptors.request.use(onRequest, onRequestError);
axiosInstance.interceptors.response.use(onResponse, onResponseError);
export default axiosClient;
