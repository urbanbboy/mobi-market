import { createAsyncThunk } from "@reduxjs/toolkit"
import { ThunkExtraArg } from "@app/providers/StoreProvider";
interface checkByUsernameProps {
    username: string;
    email: string;
}

export const checkUser = createAsyncThunk<'', checkByUsernameProps, { rejectValue: string, extra: ThunkExtraArg }>(
    'register/registerUser',
    async (authData, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI

        try {
            const response = await extra.api.post('/users/check-user/', authData)
            if (!response.data) {
                throw new Error('no data');
            }
            return response.data
        } catch (error: any) {
            return rejectWithValue(error);
        }

    }
)