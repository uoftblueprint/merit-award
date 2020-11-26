import {combineReducers} from 'redux';

import userStatusReducer from './userStatusReducer';

const rootReducer = combineReducers({
    userStatus: userStatusReducer
});

export default rootReducer;
