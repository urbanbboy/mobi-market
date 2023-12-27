import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { LoginSchema } from "../types/LoginSchema";
import { loginByUsername } from "../service/loginByUsername/loginByUsername";
import { forgotPassword } from "../service/forgotPassword/forgotPassword";
import { sendCode } from "../service/sendCode/sendCode";

const initialState: LoginSchema = {
    username: '',
    password: '',
    isLoading: false,
    
    phoneIsLoading: false,
    phoneNumber: '',

    phoneCodeIsLoading: false,
    phoneCode: '',
}

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setUsername: (state, action: PayloadAction<string>) => {
            state.username = action.payload
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload
        },
        setPhone: (state, aciton: PayloadAction<string>) => {
            state.phoneNumber = aciton.payload
        },
        setCode: (state, action: PayloadAction<string>) => {
            state.phoneCode = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginByUsername.pending, (state) => {
                state.loginError = undefined
                state.isLoading = true
            })
            .addCase(loginByUsername.fulfilled, (state) => {
                state.isLoading = false
            })
            .addCase(loginByUsername.rejected, (state, action) => {
                state.isLoading = false
                state.loginError = action.payload
            })

            //forgotPassword
            .addCase(forgotPassword.pending, (state) => {
                state.phoneIsLoading = true
                state.forgotError = undefined
            })
            .addCase(forgotPassword.fulfilled, (state) => {
                state.phoneIsLoading = false
            })
            .addCase(forgotPassword.rejected, (state, action) => {
                state.phoneIsLoading = false
                state.forgotError = action.payload
            })

            //sendCode
            .addCase(sendCode.pending, (state) => {
                state.phoneCodeIsLoading = true
                state.phoneCodeError = undefined
            })
            .addCase(sendCode.fulfilled, (state) => {
                state.phoneCodeIsLoading = false
            })
            .addCase(sendCode.rejected, (state, action) => {
                state.phoneCodeIsLoading = false
                state.phoneCodeError = action.payload
            })
    }
})

export const { actions: loginActions } = loginSlice
export const { reducer: loginReducer } = loginSlice