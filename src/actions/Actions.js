import { SET_VALUE, SET_URL, RESET_STATE } from './types';

function setValue(key, value) {
    return {
        type: SET_VALUE,
        key: key,
        value: value
    }
}

function setURL(url) {
    return {
        type: SET_URL,
        url
    }
}

function resetState() {
    return {
        type: RESET_STATE
    }
}

export {setValue, setURL, resetState};