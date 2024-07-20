import { REFRESH_TOKEN_LOCALSTORAGE_KEY } from '@shared/const/localstorage';
import axios from 'axios';

export const authApi = {
    refreshToken: async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN_LOCALSTORAGE_KEY);
        try {
            const response = await axios.post(`${__API__}/users/login/refresh/`, { refresh: refreshToken});
            return response.data;
        } catch (error) {
            console.error('Error refreshing token:', error);
            throw error;
        }
    }
};