import axios from "axios";


const initialState = {
    users: [],
    user: {},
    loginError: "",
    userLogs: []
};

const LOGIN = "LOGIN";
const LOGIN_ERROR = "LOGIN_ERROR";
const LOGOUT = "LOGOUT";
const SET_LOGS = "SET_LOGS";
const ADD_NEW_LOG = "ADD_NEW_LOG"

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
                    role: action.role,
                    id: action.id
                }
            }
        case LOGOUT:
            return {
                ...state,
                user: {}
            }
        case SET_LOGS:
            return {
                ...state,
                userLogs: action.logs
            }
        case ADD_NEW_LOG: 
        return {
            ...state, 
            userLogs: [...state.userLogs, action.log]
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
    login(login, role, id) {
        return {
            type: LOGIN,
            login,
            role, 
            id
        }
    },
    logout() {
        return {
            type: LOGOUT
        }
    },
    setLogs(logs) {
        return{
            type: SET_LOGS,
            logs
        }
    },
    addLog(log){
        return {
            type: ADD_NEW_LOG,
            log
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
                dispatch(userActionCreator.login(data.user.login, data.user.role, data.user.id))
                dispatch(getUserLogs(data.user.id))
            })
            .catch(error => {
                dispatch(userActionCreator.changeLoginError(error.response.data.message));
            })
    }
}

export const registration = (login, password) => {
    return async (dispatch) => {
        await axios
            .post("/api/users/registration", { login, password })
            .then(({ data }) => {
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
            .get("/api/users/auth", { headers:{Authorization: `Bearer ${localStorage.getItem('authorization')}`}})
            .then(({ data }) => {
                localStorage.setItem("authorization", data.token)
                dispatch(userActionCreator.login(data.user.login, data.user.role, data.user.id))
                dispatch(getUserLogs(data.user.id))
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

export const getUserLogs = (id) => {
    return async (dispatch) => {
        await axios
            .get(`/api/logs/${id}/log`, { headers: { Authorization: `Bearer ${localStorage.getItem('authorization')}` } })
            .then(({ data }) => {
                dispatch(userActionCreator.setLogs(data.logs))
            })
            .catch(error => {
                console.log(error);
            })
    }
}

export const writeNewLog = (id, log) => {
    return async (dispatch) => {
        await axios
            .post(`/api/logs/${id}/write`, { ...log }, { headers: { Authorization: `Bearer ${localStorage.getItem('authorization')}` } })
            .then(({ data }) => {
                dispatch(userActionCreator.addLog(data.log))
            })
            .catch(error => {
                console.log(error);
            })
    }
}
