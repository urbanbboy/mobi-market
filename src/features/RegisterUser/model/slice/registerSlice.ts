import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RegisterSchema } from "../types/registerSchema";
import { checkUser } from "../service/checkUser/checkUser";

const initialState: RegisterSchema = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    isLoading: false,
}

export const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {
        setUsername: (state, action: PayloadAction<string>) => {
            state.username = action.payload
        },
        setEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload
        },
        setConfirmPassword: (state, action: PayloadAction<string>) => {
            state.confirmPassword = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(checkUser.pending, (state) => {
                state.registerError = undefined
                state.isLoading = true
            })
            .addCase(checkUser.fulfilled, (state) => {
                state.isLoading = false
            })
            .addCase(checkUser.rejected, (state, action) => {
                state.isLoading = false
                state.registerError = action.payload
            })
    }
})

export const { actions: registerActions } = registerSlice
export const { reducer: registerReducer } = registerSlice