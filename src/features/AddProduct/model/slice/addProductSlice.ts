import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { addProduct } from "../service/addProduct/addProduct";
import { AddProductType } from "../types/AddProduct";

const initialState: AddProductType = {
    name: '',
    price: '',
    uploaded_images: [],
    short_description: '',
    full_description: '',

    isLoading: false,
    error: ''
}

export const addProductSlice = createSlice({
    name: 'addProduct',
    initialState,
    reducers: {
        setName: (state, action: PayloadAction<string>) => {
            state.name = action.payload
        },
        setPrice: (state, action: PayloadAction<string>) => {
            state.price = action.payload
        },
        setShortDescription: (state, action: PayloadAction<string>) => {
            state.short_description = action.payload
        },
        setFullDescription: (state, action: PayloadAction<string>) => {
            state.full_description = action.payload
        },
        resetValues: (state) => {
            state.name = ''
            state.price = ''
            state.short_description = ''
            state.full_description = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addProduct.pending, (state) => {
                state.isLoading = true;
                state.error = undefined
            })
            .addCase(addProduct.fulfilled, (state) => {
                state.isLoading = false
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
            })
    }
})

export const { actions: addProductActions } = addProductSlice
export const { reducer: addProductReducer } = addProductSlice