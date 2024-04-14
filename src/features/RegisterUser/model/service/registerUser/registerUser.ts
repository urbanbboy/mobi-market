import { createAsyncThunk } from "@reduxjs/toolkit"
import { ThunkExtraArg } from "@app/providers/StoreProvider";
import { userActions } from "@entities/User";
interface checkByUsernameProps {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export const registerUser = createAsyncThunk<'', checkByUsernameProps, { rejectValue: string, extra: ThunkExtraArg }>(
    'register/registerUser',
    async ({ username, email, password, confirmPassword }, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI

        try {
            const response = await extra.api.post('/users/register/', {
                username: username,
                email: email,
                password: password,
                confirm_password: confirmPassword
            })
            if (!response.data) {
                throw new Error('no data');
            }
            thunkAPI.dispatch(userActions.setAuthData(response.data.message))
            return response.data
        } catch (error: any) {
            return rejectWithValue("Ошибка при регистрации. Попробуйте еще раз");
        }

    }
)