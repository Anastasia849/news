import { User } from '../../store/types/typeUser';
import { getHeaders } from "../headers";

export const auth = async (): Promise<User> => {
    const response = await fetch('/api/auth', {
        method: 'GET',
        headers: getHeaders(true),
    });

    const result = await response.json();

    if (!response.ok) {
        throw result;
    }

    return result;
}
