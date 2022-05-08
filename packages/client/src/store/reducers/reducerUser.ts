import { removeToken, setToken } from './../../api/token';
import { ActionUser, UserTypeActions } from './../types/typeUser';
import { StateUser } from '../types/typeUser';

const initialState: StateUser = {};

export const reducerUser = (
    state: StateUser = initialState,
    action: ActionUser
): StateUser => {
    switch (action.type) {
        case UserTypeActions.LOGIN:
            setToken(action.token);

            return {
                ...state,
                user: action.user,
            };
        
        case UserTypeActions.LOGOUT:
            removeToken();

            return {
                ...state,
                user: undefined,
            };

        default:
            return state;
    }
}
