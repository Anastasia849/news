import { UserRole } from './../../store/types/typeUser';
import { getHeaders } from "../headers";

export interface LoginArgs {
    login: string;
    password: string;
}

interface LoginResult {
    token: string;
    user: {
        id: string;
        login: string;
        role: UserRole;
    }
}

export const postLogin = async (args: LoginArgs): Promise<LoginResult> => {
    const response = await fetch('/api/login', {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(args),
    });

    const result = await response.json();

    if (!response.ok) {
        throw result;
    }

    return result;
}
