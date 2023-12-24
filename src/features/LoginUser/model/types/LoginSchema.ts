export interface LoginSchema {
    username: string;
    password: string;
    isLoading?: boolean;
    loginError?: string | undefined;
}

export interface Errors {
    [key: string]: string | null;
    // username?: string;
    // password?: string;
}