import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ProductDetailsSchema } from "../types/ProductDetailsSchema";
import { fetchProductById } from "../services/fetchProductById";
import { Product } from "../types/Product";

const initialState: ProductDetailsSchema = {
    data: undefined,
    isLoading: false,
    error: undefined
    
}

export const productDetailsSlice = createSlice({
    name: 'productDetails',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductById.pending, (state) => {
                state.isLoading = true
                state.error = undefined
            })
            .addCase(fetchProductById.fulfilled, (state, action: PayloadAction<Product>) => {
                state.isLoading = false
                state.data = action.payload
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
            })
    }
})

export const { actions: productDetailsActions } = productDetailsSlice
export const { reducer: productDetailsReducer } = productDetailsSlice