export interface LoginSchema {
    username: string;
    password: string;
    isLoading?: boolean;
    loginError?: string | undefined;

    phoneNumber?: string; 
    phoneIsLoading?: boolean;
    forgotError?: string | undefined;
    
    phoneCode?: string;
    phoneCodeIsLoading?: boolean;
    phoneCodeError?: string | undefined;

    resetPassword?: string;
    resetConfirmPassword?: string;
    resetIsLoading?: boolean;
    resetError?: string | undefined;
}

export interface Errors {
    [key: string]: string | null;
    // username?: string;
    // password?: string;
}