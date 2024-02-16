import { createAsyncThunk } from "@reduxjs/toolkit"
import { ThunkConfig } from "@app/providers/StoreProvider";
import { Product } from "../types/Product";

    
export const deleteProductById = createAsyncThunk<Product, number, ThunkConfig<string>>(
    'deleteProduct/deleteProductById',
    async (productId, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI

        try {
            const response = await extra.api.delete(`/products/${productId}/`)
            if(!response) {
                throw new Error()
            }

            return response.data
        } catch (error: any) {
            rejectWithValue('Произошла ошибка при удалении товара')
        }

    }
)