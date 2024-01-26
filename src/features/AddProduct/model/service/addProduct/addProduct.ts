import { createAsyncThunk } from "@reduxjs/toolkit"
import { ThunkExtraArg } from "@app/providers/StoreProvider";
interface addProductProps {
    formData?: FormData
}

export const addProduct = createAsyncThunk<'', addProductProps, { rejectValue: string, extra: ThunkExtraArg }>(
    'product/addProduct',
    async ({ formData }, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI

        try {
            const response = await extra.api.post('products/', formData)
            if (!response.data) {
                throw new Error('no data');
            }

            return response.data
        } catch (error: any) {
            console.log(error)
            // if (error.response && error.response.status === 404) {
            // return rejectWithValue('Неверный ');
            // } else if(error.response && error.response.status === 401) {
            return rejectWithValue('Не удалось добавить товар. Попробуйте еще раз');
            // }
        }

    }
)