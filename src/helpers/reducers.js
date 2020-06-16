import {combineReducers} from 'redux';
import { SET_VALUE, RESET_STATE } from '../actions/types';
import {initialState, presets} from './initialState';


function appReducer(state=initialState, action) {
    switch (action.type) {
        case SET_VALUE:
            return Object.assign({}, state, {
                [action.key]: action.value,
            });
        case RESET_STATE:
            return presets;
        default:
            return state;
    }
}

export default combineReducers({
    app: appReducer
});