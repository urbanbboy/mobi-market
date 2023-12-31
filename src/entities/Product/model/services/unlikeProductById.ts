import { createAsyncThunk } from "@reduxjs/toolkit"
import { ThunkConfig } from "@app/providers/StoreProvider";
import { Product } from "../types/Product";


export const unlikeProductById = createAsyncThunk<Product, number, ThunkConfig<string>>(
    'unlikeProduct/unlikeProductById',
    async (productId, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI

        try {
            const response = await extra.api.delete(`/products/unlike/${productId}/`)
            if (!response) {
                throw new Error()
            }

            return response.data
        } catch (error: any) {
            console.log(error)
            if (error.response && error.response.status === 400) {
                return rejectWithValue('Вы уже добавили данный товар в "Понравившиеся"');
            }
        }

    }
)