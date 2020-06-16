import { SET_VALUE, RESET_STATE } from './types';

function setValue(key, value) {
    return {
        type: SET_VALUE,
        key: key,
        value: value
    }
}

function resetState() {
    return {
        type: RESET_STATE
    }
}

export {setValue, resetState};