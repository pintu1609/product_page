import axios from "axios";
import Cookies from "js-cookie";
import ENDPOINTS from "./endpoint";
// import { logout } from "../utils/index";


// const cookies = useCookies();
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_REACT_APP_BASE_URL,

  headers: {
    "Content-Type": "application/json",
     accessToken : Cookies.get('accessToken')
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = Cookies.get('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = Cookies.get('refreshToken');
      
      // try {
      //   const response = await axios.post(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}${ENDPOINTS.LOGIN}/refreshToken`, { refreshToken });
      //   const { accessToken, refreshToken: newRefreshToken } = response.data.data;

      //   Cookies.set('accessToken', accessToken, { expires: 30 });
      //   Cookies.set('refreshToken', newRefreshToken, { expires: 7 });

      //   originalRequest.headers.Authorization = `Bearer ${accessToken}`;
      //   return axiosInstance(originalRequest);
      // } catch (refreshError) {
      //   console.error("Refresh token failed:", refreshError);

      //   // Handle refresh token failure (e.g., log out the user)
      //   if (refreshError.response.status === 400 || refreshError.response.status === 401) {
      //     // logout();
      //   }
      // }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;

