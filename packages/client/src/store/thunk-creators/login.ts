import { ActionUser } from './../types/typeUser';
import { LoginArgs, postLogin } from "../../api";
import { Dispatch } from 'redux';
import actionsCreators from '../actions-creators';
import { get } from 'lodash';

export const login = (
    args: LoginArgs,
    handleSucess: () => void,
    handleError: (messageStatus: string) => void,
) => 
    async (dispatch: Dispatch<ActionUser>) => {
        try {
            const result = await postLogin(args);

            dispatch(actionsCreators.login(result.user, result.token));

            handleSucess();
        } catch (error) {
            const status = get(error, 'messageStatus');

            if (status) {
                return handleError(status);
            }
        }
    };
