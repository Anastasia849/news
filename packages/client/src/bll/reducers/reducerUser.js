import axios from "axios";


const initialState = {
    users: [],
    user: {},
    loginError: ""
};

const LOGIN = "LOGIN";
const LOGIN_ERROR = "LOGIN_ERROR";
const LOGOUT = "LOGOUT";

const reducerUser = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_ERROR:
            return {
                ...state,
                loginError: action.loginError
            }
        case LOGIN:
            return {
                ...state,
                user: {
                    login: action.login,
                    role: action.role
                }
            }
        case LOGOUT:
            return {
                ...state,
                user: {}
            }
        default: {
            return state;
        }
    }
}

export default reducerUser;

export const userActionCreator = {
    changeLoginError(loginError) {
        return {
            type: LOGIN_ERROR,
            loginError
        }
    },
    login(login, role) {
        return {
            type: LOGIN,
            login,
            role
        }
    },
    logout() {
        return {
            type: LOGOUT
        }
    }
}

export const userGetters = {
    getLoginError(state) {
        return state.reducerUser.loginError;
    },
    getNickname(state) {
        return state.reducerUser.login;
    },
    getAuthorization(state) {
        return state.reducerUser.authorization;
    }
}

export const login = (login, password) => {
    return async (dispatch) => {
        await axios
            .post("/api/users/login", {login, password})
            .then(({data}) => {
                localStorage.setItem("authorization", data.token)
                dispatch(userActionCreator.login(data.user.login, data.user.role))
            })
            .catch(error => {
                dispatch(userActionCreator.changeLoginError(error.response.data.message));
            })
    }
}

export const auth = () => {
    return async (dispatch) => {
        await axios
            .get("/api/users/auth", { headers:{Authorization: "Bearer ${localStorage.getItem('authorization')}"}})
            .then(({ data }) => {
                localStorage.setItem("authorization", data.token)
                dispatch(userActionCreator.login(data.user.login, data.user.role))
            })
            .catch(error => {
                console.log(error);
                localStorage.removeItem("authorization")
            })
    }
}

export const logout = () => {
    return (dispatch) => {
        dispatch(userActionCreator.logout());
        localStorage.removeItem("authorization");
    }
}