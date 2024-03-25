export interface User {
    username: string;
    first_name?: string;
    last_name?: string;
    birth_date?: null;
    phone?: null;
    email?: string;
    photo?: string;
}

export interface UserSchema {
    authData?: User;
    _inited: boolean;
    logoutIsLoading?: boolean;
    logoutIsError?: string;
}