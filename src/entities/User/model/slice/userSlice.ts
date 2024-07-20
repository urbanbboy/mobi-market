import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User, UserSchema } from "../types/User";
// import { USER_LOCALSTORAGE_KEY } from "@shared/const/localstorage";
import { userLogout } from "../services/userLogout/userLogout";
import { initAuthData } from "../services/initAuthData";

const initialState: UserSchema = {
    _inited: false
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAuthData: (state, action: PayloadAction<User>) => {
            state.authData = action.payload
        },
        logout: (state) => {
            state.authData = undefined;
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(userLogout.pending, (state) => {
                state.logoutIsLoading = true
                state.logoutIsError = undefined
            })
            .addCase(userLogout.fulfilled, (state) => {
                state.logoutIsLoading = false
            })
            .addCase(userLogout.rejected, (state, action) => {
                state.logoutIsLoading = false
                state.logoutIsError = action.payload
            })
            .addCase(
                initAuthData.fulfilled,
                (state, { payload }: PayloadAction<User>) => {
                    state.authData = payload;
                    state._inited = true;
                },
            );
        builder.addCase(initAuthData.rejected, (state) => {
            state._inited = true;
        });

    }
})

export const { actions: userActions } = userSlice
export const { reducer: userReducer } = userSlice