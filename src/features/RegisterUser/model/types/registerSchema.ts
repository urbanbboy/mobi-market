export interface RegisterSchema {
    username: string;
    email: string;
    password: string,
    confirmPassword: string,
    isLoading: boolean,
    registerError?: string | undefined;
}

export interface Errors {
    [key: string]: string | null;
    // username?: string;
    // password?: string;
}

export interface CheckUserProps {
    username: boolean;
    email: boolean;
}

export interface FirstFormProps {
    onSuccess: () => void
}