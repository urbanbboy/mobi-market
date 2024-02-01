import { createAsyncThunk } from "@reduxjs/toolkit"
import { ThunkConfig } from "@app/providers/StoreProvider";
import { FetchMyProductsListFulfilledPayload } from "../types/myProductsPageSchema";

export const fetchMyProductsList = createAsyncThunk<FetchMyProductsListFulfilledPayload, number, ThunkConfig<string>>(
    'productsPage/fetchMyProductList',
    async (currentPage, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI

        try {
            const response = await extra.api.get(`/products/my-products/?page=${currentPage}&limit=32`)
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