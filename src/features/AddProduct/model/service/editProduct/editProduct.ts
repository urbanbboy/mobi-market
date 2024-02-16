import { createAsyncThunk } from "@reduxjs/toolkit"
import { ThunkExtraArg } from "@app/providers/StoreProvider";
interface editProductProps {
    formData?: FormData;
    productId: number | undefined;
}

export const editProduct = createAsyncThunk<'', editProductProps, { rejectValue: string, extra: ThunkExtraArg }>(
    'product/editProduct',
    async ({ formData, productId }, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI

        try {
            const response = await extra.api.put(`products/${productId}`, formData)
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