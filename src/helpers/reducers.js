import {combineReducers} from 'redux';
import moment from 'moment';
import { SET_VALUE, SET_URL } from '../actions/types';
import permalink from './permalink'
//get query parameters to set initial states!!!!

let initialState = {
    //results
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
    fuelState: '70g',
    //form
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
    da: '',
    //app
    view: 'WB'
}

function appReducer(state=initialState, action) {
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
    app: appReducer,
    url: urlReducer
});