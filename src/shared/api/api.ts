/* eslint-disable prefer-const */
import { ACCESS_TOKEN_LOCALSTORAGE_KEY, REFRESH_TOKEN_LOCALSTORAGE_KEY, USER_LOCALSTORAGE_KEY } from "@shared/const/localstorage";
import axios, { AxiosInstance } from "axios";
import { authApi } from "./refreshToken";

type TokenRefreshCallback = (token: string) => void;

const createApi = () => {
    
    let isRefreshing = false;
    let failedQueue: TokenRefreshCallback[] = [];

    const api: AxiosInstance = axios.create({
        baseURL: __API__,
    });

    api.interceptors.request.use(async (config) => {
        const accessToken = localStorage.getItem(ACCESS_TOKEN_LOCALSTORAGE_KEY);
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    }, error => Promise.reject(error));

    function subscribeTokenRefresh(cb: TokenRefreshCallback) {
        failedQueue.push(cb);
    }

    function onRefreshed(token: string) {
        failedQueue.forEach(cb => cb(token));
        failedQueue = [];
    }

    api.interceptors.response.use(
        response => response,
        err => {
            const { config, response } = err;
            const originalRequest = config;
            if (response && response.status === 401 && !originalRequest._retry) {
                if (!isRefreshing) {
                    isRefreshing = true;
                    return authApi.refreshToken()
                        .then(({ access_token, refresh_token }) => {
                            console.log('токен обновлен', access_token)
                            localStorage.setItem(ACCESS_TOKEN_LOCALSTORAGE_KEY, access_token);
                            localStorage.setItem(REFRESH_TOKEN_LOCALSTORAGE_KEY, refresh_token);
                            api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
                            isRefreshing = false;
                            onRefreshed(access_token);
                            return Promise.all(failedQueue.map(cb => cb(access_token))).then(() => {
                                return axios(originalRequest);
                            });
                        })
                        .catch(error => {
                            isRefreshing = false;
                            console.error('Ошибка обновления токена:', error); 
                            localStorage.removeItem(ACCESS_TOKEN_LOCALSTORAGE_KEY)
                            localStorage.removeItem(REFRESH_TOKEN_LOCALSTORAGE_KEY)
                            localStorage.removeItem(USER_LOCALSTORAGE_KEY)
                            return Promise.reject(error);
                        })
                        .finally(() => failedQueue = []);
                }

                originalRequest._retry = true;
                return new Promise((resolve, reject) => {
                    subscribeTokenRefresh((token: string) => {
                        originalRequest.headers['Authorization'] = `Bearer ${token}`;
                        resolve(axios(originalRequest));
                    });
                });
            }

            return Promise.reject(err);
        }
    );

    return api;
};

export const $api = createApi();
