import { getToken } from "../api";

export const useIsAuth = () => {
    return !!getToken();
}
