import { ACCESS_TOKEN_LOCALSTORAGE_KEY, REFRESH_TOKEN_LOCALSTORAGE_KEY } from "@shared/const/localstorage";
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

    api.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;
            if (error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;

                // Проверка, чтобы не отправлять refresh при логине
                if (
                    originalRequest.url !== '/users/login/refresh/' &&
                    !originalRequest.url.includes('/users/login')
                ) {
                    try {
                        const response = await api.post('/users/login/refresh/', {
                            refresh: localStorage.getItem(REFRESH_TOKEN_LOCALSTORAGE_KEY),
                        });

                        const newAccessToken = response.data.access;

                        localStorage.setItem(ACCESS_TOKEN_LOCALSTORAGE_KEY, newAccessToken);
                        originalRequest.headers['Authorization'] = 'Bearer ' + newAccessToken;

                        return api(originalRequest);
                    } catch (refreshError) {
                        console.error('Ошибка обновления токена:', refreshError);
                        throw refreshError;
                    }
                }
            }

            return Promise.reject(error);
        }
    );

    return api;
};

export const $api = createApi();