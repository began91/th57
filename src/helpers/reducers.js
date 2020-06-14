import {combineReducers} from 'redux';
import { SET_VALUE, SET_URL } from '../actions/types';
import {initialState} from './initialState';


function appReducer(state=initialState, action) {
    switch (action.type) {
        case SET_VALUE:
            return Object.assign({}, state, {
                [action.key]: action.value,
            });
        default:
            return state;
    }
}

function urlReducer(state='', action) {
    switch (action.type) {
        case SET_URL:
            return action.url;
        default:
            return state;
    }
}

export default combineReducers({
    app: appReducer,
    url: urlReducer
});