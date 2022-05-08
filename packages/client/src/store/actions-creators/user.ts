import { ActionUser, User, UserTypeActions } from './../types/typeUser';

export const login = (user: User, token: string): ActionUser => {
    return {
        type: UserTypeActions.LOGIN,
        user,
        token,
    };
}

export const logout = (): ActionUser => {
    return {
        type: UserTypeActions.LOGOUT,
    };
}
