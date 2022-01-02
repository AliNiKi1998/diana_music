import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { loadingBarMiddleware } from "react-redux-loading-bar";


import { reducers } from './../reducers';

export const store = createStore(
    reducers,
    compose(applyMiddleware(thunk, loadingBarMiddleware())));

