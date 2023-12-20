import { createAsyncThunk } from "@reduxjs/toolkit"

interface loginByUsernameProps {
    username: string;
    password: string;
}

export const loginByUsername = createAsyncThunk<'', loginByUsernameProps, { rejectValue: string }>(
    'login/loginByUsername',
    async ({ username, password }, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI
        
        try {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            const response = await extra.api.post('/users/login/', {
                username,
                password
            })
            if (!response.data) {
                throw new Error('no data');
            }
            return response.data
        } catch (error: any) {
            if (error.response && error.response.status === 404) {
                return rejectWithValue('Неверный логин или пароль');
            } else {
                return rejectWithValue(
                    'Ошибка при входе. Пожалуйста, попробуйте снова.'
                );
            }
        }

    }
)