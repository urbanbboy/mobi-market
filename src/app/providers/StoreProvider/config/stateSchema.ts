import { ProductDetailsSchema } from "@entities/Product";
import { ProfileSchema } from "@entities/Profile";
import { UserSchema } from "@entities/User";
import { AddProductType } from "@features/AddProduct";
import { LoginSchema } from "@features/LoginUser";
import { RegisterSchema } from "@features/RegisterUser";
import { favoriteProductPageSchema } from "@pages/FavoriteProductsPage/model/types/favoriteProductPageSchema";
import { productPageSchema } from "@pages/ProductsPage";
import { AxiosInstance } from "axios";

export interface StateSchema {
    user: UserSchema;
    
    loginForm: LoginSchema;
    registerForm: RegisterSchema;
    profile: ProfileSchema;
    productDetails: ProductDetailsSchema;
    productPage: productPageSchema;
    favoriteproductPage: favoriteProductPageSchema;
    addProduct: AddProductType;
}

export interface ThunkExtraArg {
    api: AxiosInstance;
}

export interface ThunkConfig<T> {
    rejectValue: T;
    extra: ThunkExtraArg;
    state: StateSchema
}