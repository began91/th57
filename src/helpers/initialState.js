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
    //ORM
    picGen: null,
    picSlp: null,
    picProf: null,
    picPres: null,
    snaGen: null,
    snaSlp: null,
    snaProf: null,
    snaPres: null,
    ceil: null,
    wind: null,
    sigmet: null,
    imc: null,
    illum: null,
    hr0: '',
    hc0: '',
    hr1: '',
    hc1: '',
    hr2: '',
    hc2: '',
    //app
    view: 'ORM'
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