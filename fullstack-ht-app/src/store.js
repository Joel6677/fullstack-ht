
import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import openReducer from './reducers/openReducer';


const reducer = combineReducers({
    open: openReducer
});

export default createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));