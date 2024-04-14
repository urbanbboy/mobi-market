import { store } from "@app/providers/StoreProvider";
import { userLogout } from "@entities/User";
import { ACCESS_TOKEN_LOCALSTORAGE_KEY, REFRESH_TOKEN_LOCALSTORAGE_KEY } from "@shared/const/localstorage";
import axios, { AxiosError, AxiosInstance } from "axios";

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
        response => response,
        async error => {
            const originalRequest = error.config;
            const alreadyRefreshed = originalRequest._alreadyRefreshed;

            // If the error status is 401 and it's not a retry request
            if (error.response.status === 401 && !alreadyRefreshed) {
                originalRequest._retry = true;
                originalRequest._alreadyRefreshed = true;

                try {
                    const refreshToken = localStorage.getItem(REFRESH_TOKEN_LOCALSTORAGE_KEY);
                    const { data } = await api.post('/users/login/refresh/', {
                        refresh: refreshToken,
                    });

                    // Обновляем токены в локальном хранилище
                    localStorage.setItem(ACCESS_TOKEN_LOCALSTORAGE_KEY, data.access);
                    localStorage.setItem(REFRESH_TOKEN_LOCALSTORAGE_KEY, data.refresh);

                    // Обновляем заголовок авторизации в оригинальном запросе
                    originalRequest.headers['Authorization'] = `Bearer ${data.access}`;

                    // Повторяем оригинальный запрос с обновлённым токеном
                    return api(originalRequest);
                } catch (refreshError: any) {
                    console.error('Error refreshing token:', refreshError);
                    if ((refreshError as AxiosError).response && refreshError.response.data && refreshError.response.data.code === "token_not_valid") {
                        // Если получили ответ с ошибкой "Token is invalid or expired", выходим из аккаунта
                        store.dispatch(userLogout());
                    }
                    return Promise.reject(error);
                }
            }

            // Если ошибка не связана с аутентификацией, просто возвращаем ошибку дальше
            return Promise.reject(error);
        }
    )

    api.interceptors.response.use(
        response => response,
        async error => {
            const originalRequest = error.config;
            if (error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;
                try {
                    const refreshToken = localStorage.getItem(REFRESH_TOKEN_LOCALSTORAGE_KEY);
                    const response = await api.post('/users/login/refresh/', {
                        refresh: refreshToken,
                    });
                    const { access, refresh } = response.data;
                    localStorage.setItem(ACCESS_TOKEN_LOCALSTORAGE_KEY, access);
                    localStorage.setItem(REFRESH_TOKEN_LOCALSTORAGE_KEY, refresh);
                    api.defaults.headers.common['Authorization'] = `Bearer ${access}`;
                    return api(originalRequest);
                } catch (refreshError: any) {
                    console.error('Error refreshing token:', refreshError);
                    if ((refreshError as AxiosError).response && refreshError.response.data && refreshError.response.data.code === "token_not_valid") {
                        localStorage.removeItem(ACCESS_TOKEN_LOCALSTORAGE_KEY);
                        localStorage.removeItem(REFRESH_TOKEN_LOCALSTORAGE_KEY);
                        store.dispatch(userLogout())
                    }
                    return Promise.reject(error);
                }
            }
            return Promise.reject(error);
        }
    );

    return api;
};

export const $api = createApi();
