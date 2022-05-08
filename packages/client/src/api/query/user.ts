import { getHeaders } from "../headers";

export interface FetchAvatarResult {
    avatarSrc: string;
}

export const fetchAvatar = async (userId: string): Promise<FetchAvatarResult> => {
    const response = await fetch(`/api/users/${userId}/avatar`, {
        method: 'GET',
        headers: getHeaders(true),
    });

    const result = await response.json();

    if (!response.ok) {
        throw result;
    }

    return result;
}
