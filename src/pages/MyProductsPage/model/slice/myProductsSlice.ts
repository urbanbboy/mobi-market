import { StateSchema } from "@app/providers/StoreProvider";
import { Product } from "@entities/Product";
import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { FetchMyProductsListFulfilledPayload, myProductsPageSchema } from "../types/myProductsPageSchema";
import { fetchMyProductsList } from "../service/fetchMyProductsList";

const productsAdapter = createEntityAdapter({
    selectId: (product: Product) => product.id
})

export const getProducts = productsAdapter.getSelectors<StateSchema>(
    (state) => state.myProductsPage || productsAdapter.getInitialState()
)

export const MyProductsPageSlice = createSlice({
    name: 'myProducts',
    initialState: productsAdapter.getInitialState<myProductsPageSchema>({
        isLoading: false,
        error: undefined,
        currentPage: 1,
        totalItems: 0,
        totalPages: 0,
        ids: [],
        entities: {},
    }),
    reducers: {
        likeProduct: (state, action) => {
            const product = state.entities[action.payload]
            if(product) {
                product.liked_by_current_user = true
            }
        },
        unlikeProduct: (state, action) => {
            const product = state.entities[action.payload]
            if(product) {
                product.liked_by_current_user = false
            }
        }   
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMyProductsList.pending, (state) => {
                state.isLoading = true
                state.error = undefined
            })
            .addCase(fetchMyProductsList.fulfilled, (state, action) => {
                const payload: FetchMyProductsListFulfilledPayload = action.payload

                state.isLoading = false
                state.currentPage = payload.page
                state.totalItems = payload.count
                state.totalPages = Math.ceil(payload.count / 32)
                productsAdapter.setAll(state, payload.results);
            })
            .addCase(fetchMyProductsList.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
            })
    }
    
})

export const { actions: myProductsActions } = MyProductsPageSlice
export const { reducer: myProductsReducer } = MyProductsPageSlice