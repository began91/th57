import moment from 'moment';

const presets = {
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
};

//shallow copy
let initialState = {...presets};

//get query params
let urlParams = new URLSearchParams(decodeURI(window.location.search));

//update initial state
urlParams.forEach((value, key) => {
    initialState[key] = value;
});

export { presets, initialState };