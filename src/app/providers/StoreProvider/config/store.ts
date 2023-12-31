import { ReducersMapObject, configureStore } from "@reduxjs/toolkit";
import { StateSchema } from "..";
import { loginReducer } from "@features/LoginUser";
import { $api } from "@shared/api/api";
import { userReducer } from "@entities/User";
import { registerReducer } from "@features/RegisterUser";
import { profileReducer } from "@entities/Profile";
import { productDetailsReducer } from "@entities/Product";
import { productPageReducer } from "@pages/ProductsPage";
import { favoriteProductsReducer } from "@pages/FavoriteProductsPage";

const rootReducer: ReducersMapObject<StateSchema> =  {
    user: userReducer,

    registerForm: registerReducer,
    loginForm: loginReducer,
    profile: profileReducer,
    productDetails: productDetailsReducer,
    productPage: productPageReducer,
    favoriteproductPage: favoriteProductsReducer
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