import { UserSchema } from "@entities/User";
import { LoginSchema } from "@features/LoginUser";
import { RegisterSchema } from "@features/RegisterUser";
import { AxiosInstance } from "axios";

export interface StateSchema {
    user: UserSchema;
    
    loginForm: LoginSchema;
    registerForm: RegisterSchema;
}

export interface ThunkExtraArg {
    api: AxiosInstance;
}