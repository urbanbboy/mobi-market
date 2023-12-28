import { createAsyncThunk } from "@reduxjs/toolkit"
import { ThunkConfig } from "@app/providers/StoreProvider";
import { FetchFavoriteProductListFulfilledPayload } from "../types/favoriteProductPageSchema";

export const fetchFavoriteProductsList = createAsyncThunk<FetchFavoriteProductListFulfilledPayload, number, ThunkConfig<string>>(
    'productsPage/fetchProductList',
    async (currentPage, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI

        try {
            const response = await extra.api.get(`/products/liked/?page=${currentPage}&limit=32`)
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