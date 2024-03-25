import { ACCESS_TOKEN_LOCALSTORAGE_KEY } from "@shared/const/localstorage";
import axios, { AxiosInstance } from "axios";
import { refreshAccessToken } from "./refreshAccessToken";

const createApi = () => {
    const api: AxiosInstance = axios.create({
        baseURL: __API__,
    });

    api.interceptors.request.use(async (config) => {
        const accessToken = localStorage.getItem(ACCESS_TOKEN_LOCALSTORAGE_KEY);
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    });

    api.interceptors.response.use(
        response => {
            return response
        },
        async error => {
            const originalRequest = error.config;
            if (error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;
                const accessToken = await refreshAccessToken();
                axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
                return api(originalRequest)
            }
            return Promise.reject(error);
        }
    )

    return api;
};

export const $api = createApi();
