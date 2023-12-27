import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkExtraArg } from "@app/providers/StoreProvider";
import { User, userActions } from "@entities/User";
import { ACCESS_TOKEN_LOCALSTORAGE_KEY, REFRESH_TOKEN_LOCALSTORAGE_KEY } from "@shared/const/localstorage";

export const refreshAccessToken = createAsyncThunk<User, void, { rejectValue: string, extra: ThunkExtraArg }>(
    'login/refreshAccessToken',
    async (_, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI;

        try {
            const response = await extra.api.post('/users/login/refresh/', {
                refresh: localStorage.getItem(REFRESH_TOKEN_LOCALSTORAGE_KEY),
            });

            const newAccessToken = response.data.access;

            localStorage.setItem(ACCESS_TOKEN_LOCALSTORAGE_KEY, newAccessToken);
            thunkAPI.dispatch(userActions.setAuthData(response.data));

            return response.data;
        } catch (error: any) {
            console.error('Ошибка обновления токена:', error);
            return rejectWithValue('Ошибка обновления токена');
        }
    }
);
