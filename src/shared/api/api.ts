import { ACCESS_TOKEN_LOCALSTORAGE_KEY } from "@shared/const/localstorage";
import axios, { AxiosInstance } from "axios";
// import { refreshAccessToken } from "./refreshAccessTpken";

const BASE_URL = 'https://neobook.online/mobi-market';

const createApi = () => {
    const api: AxiosInstance = axios.create({
        baseURL: BASE_URL,
    });

    api.interceptors.request.use(async (config) => {
        const accessToken = localStorage.getItem(ACCESS_TOKEN_LOCALSTORAGE_KEY);
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    });

    // api.interceptors.response.use(
    //     (response) => response,
    //     async (error: AxiosError) => {
    //         const originalRequest = error.config;
    //         if (error.response?.status === 401 && localStorage.getItem(REFRESH_TOKEN_LOCALSTORAGE_KEY)) {
    //             try {
    //                 const newAccessToken = await refreshAccessToken();
    //                 if (originalRequest) {
    //                     originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
    //                     return axios(originalRequest);
    //                 } else {
    //                     console.error("Original request is undefined");
    //                 }
    //             } catch (refreshError) {
    //                 console.error("Error refreshing access token:", refreshError);
    //                 location.href = '/login'
    //             }
    //         }

    //         return Promise.reject(error);
    //     }
    // );

    return api;
};

export const $api = createApi();