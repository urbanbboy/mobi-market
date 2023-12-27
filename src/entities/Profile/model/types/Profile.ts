export interface Profile {
    first_name?: string;
    last_name?: string;
    username?: string;
    birth_date?: string;
    email?: string;
    phone?: string;
    photo?: string;
}

export interface ProfileSchema {
    data?: Profile;
    form?: Profile;
    isLoading?: boolean;
    profileError?: string | undefined;
    readOnly?: boolean;
    isFinished?: boolean;
}