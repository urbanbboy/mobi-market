import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
    username: '',
    password: '',
    isLoading: false,
}

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setAuthData: (state, action: PayloadAction<string>) => {
            state.username = action.payload
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload
        }
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(loginByUsername.pending, (state) => {
    //             state.loginError = undefined
    //             state.isLoading = true
    //         })
    // }
})

export const { actions: loginActions } = loginSlice
export const { reducer: loginReducer } = loginSlice