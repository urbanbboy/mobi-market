import { createAsyncThunk } from "@reduxjs/toolkit"
import { ThunkExtraArg } from "@app/providers/StoreProvider";
interface resetPasswordProps {
    resetPassword: string;
    resetConfirmPassword: string;
}

export const resetUserPassword = createAsyncThunk<'', resetPasswordProps, { rejectValue: string, extra: ThunkExtraArg }>(
    'reset/resetPassword',
    async ({ resetPassword, resetConfirmPassword }, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI

        try {
            const response = await extra.api.post('/users/change-password/', {
                password: resetPassword,
                confirm_password: resetConfirmPassword
            })
            if (!response.data) {
                throw new Error('no data');
            }
            //ПОДУМАТЬ НАД ТОКЕНАМИ КОТОРЫЕ ПРЕДОСТАВЛЯЕТ FORGOT PASSWORD(смотреть в сваггере)
            // localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data.message))
            // thunkAPI.dispatch(userActions.setAuthData(response.data.message))
            return response.data
        } catch (error: any) {
            if (error.response && error.response.status === 401) {
                return rejectWithValue('Возникла ошибка при изменении пароля');
            }
        }

    }
)