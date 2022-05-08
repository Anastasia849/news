import { reducerUser } from './reducerUser';
import { combineReducers } from "redux"

export const rootReducer = combineReducers({
    reducerUser,
});

export type RootState = ReturnType<typeof rootReducer>
