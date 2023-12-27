import { createAsyncThunk } from "@reduxjs/toolkit"
import { ThunkConfig } from "@app/providers/StoreProvider";
import { FetchProductListFulfilledPayload } from "../types/productPageSchema";

export const fetchProductList = createAsyncThunk<FetchProductListFulfilledPayload, number, ThunkConfig<string>>(
    'productsPage/fetchProductList',
    async (currentPage, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI

        try {
            const response = await extra.api.get(`/products/?page=${currentPage}&limit=32`)
            if (!response) {
                throw new Error()
            }

            return response.data
        } catch (error: any) {
            console.log(error)
            rejectWithValue('Произошла ошибка при загрузке товаров')
        }

    }
)