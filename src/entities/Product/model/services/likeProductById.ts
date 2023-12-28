import { createAsyncThunk } from "@reduxjs/toolkit"
import { ThunkConfig } from "@app/providers/StoreProvider";
import { Product } from "../types/Product";

    
export const likeProductById = createAsyncThunk<Product, number, ThunkConfig<string>>(
    'likeProduct/likeProductById',
    async (productId, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI

        try {
            const response = await extra.api.post(`/products/like/${productId}/`)
            if(!response) {
                throw new Error()
            }

            return response.data
        } catch (error: any) {
            console.log(error)
            rejectWithValue('Произошла ошибка при загрузке товара')
        }

    }
)