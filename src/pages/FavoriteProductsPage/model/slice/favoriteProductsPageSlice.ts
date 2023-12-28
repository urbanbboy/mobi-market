import { StateSchema } from "@app/providers/StoreProvider";
import { Product } from "@entities/Product";
import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { FetchFavoriteProductListFulfilledPayload, favoriteProductPageSchema } from "../types/favoriteProductPageSchema";
import { fetchFavoriteProductsList } from "../services/fetchFavoriteProductsList";

const productsAdapter = createEntityAdapter({
    selectId: (product: Product) => product.id
})

export const getProducts = productsAdapter.getSelectors<StateSchema>(
    (state) => state.productPage || productsAdapter.getInitialState()
)

export const favoriteProductsPageSlice = createSlice({
    name: 'favoriteProducts',
    initialState: productsAdapter.getInitialState<favoriteProductPageSchema>({
        isLoading: false,
        error: undefined,
        currentPage: 1,
        totalItems: 0,
        totalPages: 0,
        ids: [],
        entities: {},
    }),
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFavoriteProductsList.pending, (state) => {
                state.isLoading = true
                state.error = undefined
            })
            .addCase(fetchFavoriteProductsList.fulfilled, (state, action) => {
                const payload: FetchFavoriteProductListFulfilledPayload = action.payload

                state.isLoading = false
                state.currentPage = payload.page
                state.totalPages = Math.ceil(payload.count / 32)
                state.totalItems = payload.count
                productsAdapter.setAll(state, payload.results);
            })
            .addCase(fetchFavoriteProductsList.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
            })
    }
    
})

export const { reducer: favoriteProductsReducer } = favoriteProductsPageSlice