export interface LoginSchema {
    username: string;
    password: string;
    isLoading: boolean;
    error?: string | undefined;
}

export interface Errors {
    username?: string;
    password?: string;
}