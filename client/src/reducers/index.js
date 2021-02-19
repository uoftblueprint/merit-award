  
import {combineReducers} from 'redux';

import userStatusReducer, { userTypeReducer} from './userStatusReducer';

const rootReducer = combineReducers({
    userStatus: userStatusReducer,
    userType: userTypeReducer,
});

export default rootReducer;