import { ADD, SUBT, TOGGLE_EXT_OPS, SET_VALUE } from './types';

function addOne() {
    return {
    type: ADD,
    value: 1
    };
}

function subtOne() {
    return {
        type: SUBT,
        value: 1
    };
}

function toggleExtOps() {
    return {
        type: TOGGLE_EXT_OPS,
        value: ''
    }
}

function setValue(key, value) {
    return {
        type: SET_VALUE,
        key: key,
        value: value
    }
}

export {addOne, subtOne, toggleExtOps, setValue};