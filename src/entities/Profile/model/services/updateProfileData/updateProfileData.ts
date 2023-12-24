
import { ThunkConfig } from "@app/providers/StoreProvider"
import { createAsyncThunk } from "@reduxjs/toolkit"

interface updateProfileDataProps {
    formData?: FormData;
  }

export const updateProfileData = createAsyncThunk<'', updateProfileDataProps, ThunkConfig<string>>(
    'profile/updateProfileData',
    async ({formData}: updateProfileDataProps, thunkAPI) => {
        const { extra, rejectWithValue,  } = thunkAPI
        
        // const formData = getProfileForm(getState())  

        try {
            const response = await extra.api.put('/users/profile/update/', formData)

            return response.data
        } catch (error: any) {
            console.log(error)
            rejectWithValue("Произошла ошибка. Повторите попытку!")
        }

    }
)