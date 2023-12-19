import { ReducersMapObject, configureStore } from "@reduxjs/toolkit";
import { StateSchema } from "..";
import { loginReducer } from "@features/LoginUser";

const rootReducer: ReducersMapObject<StateSchema> =  {
    loginForm: loginReducer
}

export const store = configureStore<StateSchema>({
    reducer: rootReducer
})

export type AppDispatch = typeof store.dispatch