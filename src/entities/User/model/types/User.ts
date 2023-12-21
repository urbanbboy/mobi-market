export interface User {
    username: string;
    firstName?: string;
    lastName?: string;
    birthDate?: null;
    phone?: null;
    email?: string;
}

export interface UserSchema {
    authData?: User;
    _inited: boolean;
}