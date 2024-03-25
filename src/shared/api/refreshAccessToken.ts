import { ACCESS_TOKEN_LOCALSTORAGE_KEY, REFRESH_TOKEN_LOCALSTORAGE_KEY } from "@shared/const/localstorage";
import axios from "axios";

export const refreshAccessToken = async () => {
    if (!localStorage.getItem(REFRESH_TOKEN_LOCALSTORAGE_KEY)) {
        throw new Error('Refresh token is missing');
    }

    const response = await axios.post(__API__ + '/users/login/refresh/', {
        refresh: localStorage.getItem(REFRESH_TOKEN_LOCALSTORAGE_KEY),
    });

    const newAccessToken = response.data.access
    localStorage.setItem(ACCESS_TOKEN_LOCALSTORAGE_KEY, newAccessToken)

    return newAccessToken;
};