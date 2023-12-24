import { createAsyncThunk } from "@reduxjs/toolkit"
import { ThunkExtraArg } from "@app/providers/StoreProvider";
import { User, userActions } from "@entities/User";
import { ACCESS_TOKEN_LOCALSTORAGE_KEY, REFRESH_TOKEN_LOCALSTORAGE_KEY, USER_LOCALSTORAGE_KEY } from "@shared/const/localstorage";
interface loginByUsernameProps {
    username: string;
    password: string;
}

export const loginByUsername = createAsyncThunk<User, loginByUsernameProps, { rejectValue: string, extra: ThunkExtraArg }>(
    'login/loginByUsername',
    async (authData, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI
        
        try {
            const response = await extra.api.post('/users/login/', authData)
            if (!response.data) {
                throw new Error('no data');
            }

            localStorage.setItem(ACCESS_TOKEN_LOCALSTORAGE_KEY, response.data.access)
            localStorage.setItem(REFRESH_TOKEN_LOCALSTORAGE_KEY, response.data.refresh)
            localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data))
            thunkAPI.dispatch(userActions.setAuthData(response.data))

            return response.data
        } catch (error: any) {
            if (error.response && error.response.status === 404) {
                return rejectWithValue('Неверный логин или пароль');
            } else if(error.response && error.response.status === 401) {
                return rejectWithValue('Пароль неверный');
            }
        }

    }
)