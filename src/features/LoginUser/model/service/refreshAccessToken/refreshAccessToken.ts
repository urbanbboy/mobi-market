import { createAsyncThunk } from "@reduxjs/toolkit"
import { ThunkExtraArg } from "@app/providers/StoreProvider";
import { userActions } from "@entities/User";
import { ACCESS_TOKEN_LOCALSTORAGE_KEY, REFRESH_TOKEN_LOCALSTORAGE_KEY, USER_LOCALSTORAGE_KEY } from "@shared/const/localstorage";
import axios from "axios";

export const refreshAccessToken = () => {
    if (localStorage.getItem(REFRESH_TOKEN_LOCALSTORAGE_KEY)) {
        try {
            const response = axios.post('', {
                refresh: localStorage.getItem(REFRESH_TOKEN_LOCALSTORAGE_KEY)
            })
            return response.data.access
        } catch (error) {
            console.log(error)
        }
    }
}


// export const refreshAccessToken = createAsyncThunk<string, void, { rejectValue: string, extra: ThunkExtraArg }>(
//     'refresh/refreshAccessToken',
//     async (_, thunkAPI) => {
//         const { extra, rejectWithValue } = thunkAPI

//         try {
//             const response = await extra.api.post('/users/login/refresh/', {
//                 refresh: localStorage.getItem(REFRESH_TOKEN_LOCALSTORAGE_KEY)
//             })
//             if (!response.data || response.status !== 200) {
//                 throw new Error('Ошибка обновления токена! ');
//             }

//             localStorage.setItem(ACCESS_TOKEN_LOCALSTORAGE_KEY, response.data.access)
//             localStorage.setItem(REFRESH_TOKEN_LOCALSTORAGE_KEY, response.data.refresh)
//             localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data))
//             // thunkAPI.dispatch(userActions.setAuthData(response.data))

//             return response.data
//         } catch (error: any) {
//             if (error.response && error.response.status === 404) {
//                 return rejectWithValue('Неверный логин или пароль');
//             } else if (error.response && error.response.status === 401) {
//                 return rejectWithValue('Пароль неверный');
//             }
//         }

//     }
// )