import { SET_VALUE, SET_URL } from './types';

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

export {setValue, setURL};