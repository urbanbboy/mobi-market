import { ThunkConfig } from "@app/providers/StoreProvider";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "../types/User";
import { USER_LOCALSTORAGE_KEY } from "@shared/const/localstorage";
import { fetchProfileData } from "@entities/Profile";

export const initAuthData = createAsyncThunk<User, void, ThunkConfig<string>>(
    'user/initAuthData',
    async (_, thunkApi) => {
        const { rejectWithValue, dispatch } = thunkApi

        const user = localStorage.getItem(USER_LOCALSTORAGE_KEY);

        if (!user) {
            return rejectWithValue('');
        }

        try {
            await dispatch(fetchProfileData()).unwrap();
            return JSON.parse(user);
        } catch (e) {
            console.log(e)
            return rejectWithValue('')
        }
    }
)