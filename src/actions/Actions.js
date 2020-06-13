import { SET_VALUE } from './types';

function setValue(key, value) {
    return {
        type: SET_VALUE,
        key: key,
        value: value
    }
}

export {setValue};