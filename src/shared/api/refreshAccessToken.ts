import { ACCESS_TOKEN_LOCALSTORAGE_KEY, REFRESH_TOKEN_LOCALSTORAGE_KEY } from "@shared/const/localstorage";
import { $api } from "./api";

export const refreshAccessToken = async () => {
    const response = await $api.post('/users/login/refresh/', {
        refresh: localStorage.getItem(REFRESH_TOKEN_LOCALSTORAGE_KEY),
    });

    const newAccessToken = response.data.access
    const newRefreshToken = response.data.refresh

    localStorage.setItem(ACCESS_TOKEN_LOCALSTORAGE_KEY, newAccessToken)
    localStorage.setItem(REFRESH_TOKEN_LOCALSTORAGE_KEY, newRefreshToken)

    return newAccessToken;
};