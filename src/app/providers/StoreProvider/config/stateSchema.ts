import { AxiosInstance } from "axios";
import { AddProductType } from "@features/AddProduct";
import { RegisterSchema } from "@features/RegisterUser";
import { favoriteProductPageSchema } from "@pages/FavoriteProductsPage";
import { myProductsPageSchema } from "@pages/MyProductsPage";
import { productPageSchema } from "@pages/ProductsPage";
import { LoginSchema } from "@features/LoginUser";
import { ProductDetailsSchema } from "@entities/Product";
import { UserSchema } from "@entities/User";
import { ProfileSchema } from "@entities/Profile";

export interface StateSchema {
    user: UserSchema;
    
    loginForm: LoginSchema;
    registerForm: RegisterSchema;
    profile: ProfileSchema;
    productDetails: ProductDetailsSchema;
    productPage: productPageSchema;
    favoriteProductPage: favoriteProductPageSchema;
    addProduct: AddProductType;
    myProductsPage: myProductsPageSchema;
}

export interface ThunkExtraArg {
    api: AxiosInstance;
}

export interface ThunkConfig<T> {
    rejectValue: T;
    extra: ThunkExtraArg;
    state: StateSchema
}