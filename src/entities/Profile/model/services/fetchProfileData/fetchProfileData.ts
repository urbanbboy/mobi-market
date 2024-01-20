import { createAsyncThunk } from "@reduxjs/toolkit"
import { Profile } from "../../types/Profile";
import { ThunkConfig } from "@app/providers/StoreProvider";

    
export const fetchProfileData = createAsyncThunk<Profile, void, ThunkConfig<string>>(
    'profile/fetchProfileData',
    async (_, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI

        try {
            const response = await extra.api.get('/users/me/')
            return response.data
            console.log(response.data)
        } catch (error: any) {
            console.log(error)
            rejectWithValue('Произошла ошибка при загрузке страницы профиля')
        }

    }
)