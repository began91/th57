import {combineReducers} from 'redux';
import { ADD, SUBT, TOGGLE_EXT_OPS, SET_VALUE} from '../actions/types';

let initialResultState = {
    extOps: false,
    pax: '',
    baggage: '',
    paxExternal: '',
    extFuelGal: 50,
    extLoad: 150,
    otherFuel: 91,
    fuelGal: 70,
    maxFuel: 0,
    maxFuelExt: 0
}

function resultsReducer(state=initialResultState,action) {
    switch (action.type) {
        case TOGGLE_EXT_OPS:
            return Object.assign({}, state, {
                extOps: !state.extOps
            });
        case SET_VALUE:
            return Object.assign({}, state, {
                [action.key]: action.value
            });
        default:
            return state;
    }
}

export default combineReducers({
    results: resultsReducer
});