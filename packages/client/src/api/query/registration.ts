import { getHeaders } from "../headers";

export interface RegistrationArgs {
    login: string;
    password: string;
}

interface RegistrationResult {
    messageStatuses: string;
}

export const postRegistration = async (args: RegistrationArgs): Promise<RegistrationResult> => {
    const response = await fetch('/api/registration', {
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
