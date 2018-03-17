import {combineReducers} from 'redux';

const testReducer = (state = {}) => state;

const appReducer = combineReducers({
    testReducer
});

export default appReducer;