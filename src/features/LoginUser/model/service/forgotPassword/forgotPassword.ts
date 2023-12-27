import { createAsyncThunk } from "@reduxjs/toolkit"
import { ThunkExtraArg } from "@app/providers/StoreProvider";
import { User } from "@entities/User";
import { USER_ID_LOCALSTORAGE_KEY } from "@shared/const/localstorage";
interface forgotPasswordProps {
    phone: string | undefined
}

export const forgotPassword = createAsyncThunk<User, forgotPasswordProps, { rejectValue: string, extra: ThunkExtraArg }>(
    'forgot/ForgotPassword',
    async (phone, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI
        
        try {
            const response = await extra.api.post('/users/forgot-password/', phone)
            if (!response.data) {
                throw new Error('no data');
            }

            localStorage.setItem(USER_ID_LOCALSTORAGE_KEY, response.data.user_id)

            return response.data
        } catch (error: any) {
            if(error.response && error.response.status === 406) {
                return rejectWithValue('Данный номер не зарегистрирован')
            }
        }

    }
)