import { RootState } from "../reducers";

export const selectUser = (state: RootState) => state.reducerUser.user;
