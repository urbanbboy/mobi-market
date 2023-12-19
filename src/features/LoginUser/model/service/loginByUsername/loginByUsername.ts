import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

interface loginByUsernameProps {
    username: string;
    password: string;
}

export const loginByUsername = createAsyncThunk<'', loginByUsernameProps, { rejectValue: string }>(
    'login/loginByUsername',
    async ({ username, password }, thunkAPI) => {
        try {
            const response = await axios.post('https://neobook.online/mobi-market/users/login/', {
                username,
                password
            })

            if(!response.data) {
                throw new Error('no data');
                
            }
            return response.data
        } catch (error) {
            console.log(error)
            thunkAPI.rejectWithValue('error in login/loginByUsername async thunk')
        }

    }
)