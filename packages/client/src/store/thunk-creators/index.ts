import * as login from './login';
import * as registration from './registration';

export const thunkCreators = {
    ...login,
    ...registration
};
