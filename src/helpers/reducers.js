import {combineReducers} from 'redux';
import moment from 'moment';
import { SET_VALUE, SET_URL } from '../actions/types';
//get query parameters to set initial states!!!!
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
    maxFuelExt: 0,
    fuelState: '70g'
}

function resultsReducer(state=initialResultState,action) {
    switch (action.type) {
        case SET_VALUE:
            return Object.assign({}, state, {
                [action.key]: action.value
            });
        default:
            return state;
    }
}
//get query parameters to set initial states!!!!
let initialFormState = {
    eventName: '',
    inst: '',
    vest: 'wet',
    instWt: '',
    aircraftID: 'unkB',
    spot: '',
    curwx: '',
    fcst: '',
    date: new moment().format('DDMMMYY'),
    stud: '',
    studWt: '',
    mxTmp: '',
    pa: '',
    da: ''
}

function formReducer(state=initialFormState,action) {
    switch (action.type) {
        case SET_VALUE:
            return Object.assign({}, state, {
                [action.key]: action.value
            });
        default:
            return state;
    }
}

let initialAppState = {
    view: 'WB'
}

function appReducer(state=initialAppState, action) {
    switch (action.type) {
        case SET_VALUE:
            return Object.assign({}, state, {
                [action.key]: action.value
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
    results: resultsReducer,
    form: formReducer,
    app: appReducer,
    url: urlReducer
});