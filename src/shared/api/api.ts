import { ACCESS_TOKEN_LOCALSTORAGE_KEY } from "@shared/const/localstorage";
import axios, { AxiosInstance } from "axios";


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

    return api;
};

export const $api = createApi();
