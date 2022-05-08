import { getAuthorization } from "./token";

export const getHeaders = (withAuth?: boolean | undefined, headers?: HeadersInit): HeadersInit => {
    const authorization = getAuthorization() || '';

    return {
        'Content-Type': 'application/json',
        'Authorization': withAuth ? authorization : '',
    };
}
