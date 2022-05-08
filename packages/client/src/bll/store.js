import { applyMiddleware, combineReducers, compose, createStore } from "redux";
// import { applyMiddleware, combineReducers, compose, configureStore } from "redux";
import thunk from "redux-thunk";
import reducerUser from "./reducers/reducerUser";


const reducer = combineReducers({
    reducerUser
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

export default store;