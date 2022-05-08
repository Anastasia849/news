import { getToken } from './../api/token';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from "../api/query/auth";
import actionsCreators from '../store/actions-creators';

export const useAuth = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            const token = getToken();

            if (!token) {
                return;
            }

            const result = await auth();

            dispatch(actionsCreators.login(result, token));
        })();
    }, [dispatch]);
};
