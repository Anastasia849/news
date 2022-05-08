export enum UserRole {
    MODERATOR = 'MODERATOR',
    USER = 'USER',
};

export interface User {
    id: string;
    login: string;
    role: UserRole;
};

export interface StateUser {
    user?: User;
}

export enum UserTypeActions {
    LOGIN = "LOGIN",
    LOGOUT = "LOGOUT",
}

interface Login {
    type: UserTypeActions.LOGIN;
    user: User;
    token: string;
}

interface Logout {
    type: UserTypeActions.LOGOUT;
}

export type ActionUser = Login | Logout;
