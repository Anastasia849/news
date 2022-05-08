import { thunkCreators } from './index';
import { postRegistration, RegistrationArgs } from './../../api/query/registration';
import { Dispatch } from 'redux';
import { get } from 'lodash';

export const registration = (
    args: RegistrationArgs,
    handleSucess: () => void,
    handleError: (messageStatus: string) => void,
) => 
    async (dispatch: Dispatch<any>) => {
        try {
            await postRegistration(args);
            dispatch(thunkCreators.login(args, handleSucess, handleError));
        } catch (error) {
            const status = get(error, 'messageStatus');

            if (status) {
                return handleError(status);
            }
        }
    };
