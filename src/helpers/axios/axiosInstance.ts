import { authKey } from "@/constants";
import logout from "@/services/actions/logout";
import setAccessToken from "@/services/actions/setAccessToken";
//import { getNewAccessToken } from "@/services/auth.services";
import { TErrorResponse, TResponseSuccess } from "@/types";

import axios from "axios";
import toast from "react-hot-toast";

const axiosInstance = axios.create();
axiosInstance.defaults.headers["Content-Type"] = "application/json";
axiosInstance.defaults.headers["Accept"] = "application/json";
axiosInstance.defaults.timeout = 60000;

// Add a request interceptor
axiosInstance.interceptors.request.use(
  function (config) {
    const accessToken = localStorage.getItem(authKey.token);
    if (accessToken) {
      config.headers.Authorization = accessToken;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  //@ts-ignore
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    const responseObject: TResponseSuccess<any> = {
      data: response?.data?.data,
      meta: response?.data?.meta,
      message: response?.data?.message,
      success: response?.data?.success,
      statusCode: response?.status,
    };

    return responseObject;
  },
  async function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const config = error?.config;
    if (error.response?.status === 401 && !config?.sent) {
      config.sent = true;
      //const res = await getNewAccessToken();
      //const accessToken = res?.data?.accessToken;
      if (true) {
        //config.headers.Authorization = accessToken;
        //setToLocalStorage(authKey.accessToken, accessToken);
        //setAccessToken(accessToken);
        toast.error(" Token expired temporary your are logged out, will fixed it later");
        logout();
        return axiosInstance(config);
      } else {
        //removeFromLocalStorage(authKey.accessToken);
      }
    } else {
      const responseObject: TErrorResponse = {
        statusCode: error?.response?.data?.statusCode || 500,
        message: error?.response?.data?.message || "Something went wrong",
        errorDetails: error?.response?.data?.errorDetails || null,
      };
      return responseObject;
    }
  },
);

export { axiosInstance };
