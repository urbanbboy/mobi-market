import { createAsyncThunk } from "@reduxjs/toolkit"
import { ThunkConfig } from "@app/providers/StoreProvider";
import { loginActions } from "@features/LoginUser/model/slice/loginSlice";
import { userActions } from "@entities/User";
import { 
    ACCESS_TOKEN_LOCALSTORAGE_KEY, 
    REFRESH_TOKEN_LOCALSTORAGE_KEY, 
    USER_ID_LOCALSTORAGE_KEY, 
    USER_LOCALSTORAGE_KEY 
} from "@shared/const/localstorage";

export const userLogout = createAsyncThunk<string, void, ThunkConfig<string>>(
    'logout/userLogout',
    async (_, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI
        
        try {
            const refreshToken = localStorage.getItem(REFRESH_TOKEN_LOCALSTORAGE_KEY)
            const response = await extra.api.post('/users/logout/', {
                refresh_token: refreshToken
            })

            localStorage.removeItem(USER_LOCALSTORAGE_KEY)
            localStorage.removeItem(ACCESS_TOKEN_LOCALSTORAGE_KEY)
            localStorage.removeItem(REFRESH_TOKEN_LOCALSTORAGE_KEY)
            localStorage.removeItem(USER_ID_LOCALSTORAGE_KEY)
            thunkAPI.dispatch(userActions.logout())
            thunkAPI.dispatch(loginActions.logout())

            return response.data
        } catch (error: any) {
            if (error.response && error.response.status === 404) {
                return rejectWithValue('Неверный логин или пароль');
            } else if(error.response && error.response.status === 401) {
                return rejectWithValue('Пароль неверный');
            } else {
                return rejectWithValue(error.message);
            }
        }

    }
)