

import { StateSchema } from "@app/providers/StoreProvider";
import { Product } from "@entities/Product";
import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { FetchProductListFulfilledPayload, productPageSchema } from "../types/productPageSchema";
import { fetchProductList } from "../services/fetchProductsList";

const productsAdapter = createEntityAdapter({
    selectId: (product: Product) => product.id
})

export const getProducts = productsAdapter.getSelectors<StateSchema>(
    (state) => state.productPage || productsAdapter.getInitialState()
)

export const productPageSlice = createSlice({
    name: 'productDetails',
    initialState: productsAdapter.getInitialState<productPageSchema>({
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
            .addCase(fetchProductList.pending, (state) => {
                state.isLoading = true
                state.error = undefined
            })
            .addCase(fetchProductList.fulfilled, (state, action) => {
                const payload: FetchProductListFulfilledPayload = action.payload

                state.isLoading = false
                state.currentPage = payload.page
                state.totalPages = Math.ceil(payload.count / 32)
                state.totalItems = payload.count
                productsAdapter.setAll(state, payload.results);
            })
            .addCase(fetchProductList.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
            })
    }
    
})

export const { reducer: productPageReducer } = productPageSlice