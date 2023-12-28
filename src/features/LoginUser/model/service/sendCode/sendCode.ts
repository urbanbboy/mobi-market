import { createAsyncThunk } from "@reduxjs/toolkit"
import { ThunkExtraArg } from "@app/providers/StoreProvider";
import { User } from "@entities/User";
import { ACCESS_TOKEN_LOCALSTORAGE_KEY, REFRESH_TOKEN_LOCALSTORAGE_KEY, USER_ID_LOCALSTORAGE_KEY } from "@shared/const/localstorage";
interface sendCodeProps {
    code: string | undefined
}

export const sendCode = createAsyncThunk<User, sendCodeProps, { rejectValue: string, extra: ThunkExtraArg }>(
    'forgot/sendCode',
    async (code, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI
        const user_id = localStorage.getItem(USER_ID_LOCALSTORAGE_KEY)

        try {
            const response = await extra.api.post(`/users/reset-password/${user_id}/`, code)
            localStorage.setItem(ACCESS_TOKEN_LOCALSTORAGE_KEY, response.data.access)
            localStorage.setItem(REFRESH_TOKEN_LOCALSTORAGE_KEY, response.data.refresh)
            return response.data
        } catch (error: any) {
            if (error.response && error.response.status === 400) {
                return rejectWithValue('Неверный код');
            }
        }

    }
)