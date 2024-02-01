import { ACCESS_TOKEN_LOCALSTORAGE_KEY } from "@shared/const/localstorage";
import axios, { AxiosInstance } from "axios";
import { refreshAccessToken } from "./refreshAccessToken";

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

    api.interceptors.response.use((response) => {
        return response
    }, async function (error) {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const access_token = await refreshAccessToken();
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
            return api(originalRequest);
        }
    })

    return api;
};

export const $api = createApi();