import { ReducersMapObject, configureStore } from "@reduxjs/toolkit";
import { StateSchema } from "..";
import { loginReducer } from "@features/LoginUser";
import { $api } from "@shared/api/api";
import { userReducer } from "@entities/User";
import { registerReducer } from "@features/RegisterUser";
import { profileReducer } from "@entities/Profile";

const rootReducer: ReducersMapObject<StateSchema> =  {
    user: userReducer,

    registerForm: registerReducer,
    loginForm: loginReducer,
    profile: profileReducer
}

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        thunk: {
            extraArgument: {
                api: $api
            }
        }
    })
})

export type AppDispatch = typeof store.dispatch