import {combineReducers} from 'redux';

import applicantInfoReducer from './applicantInfoReducer';
import userStatusReducer from './userStatusReducer';

const rootReducer = combineReducers({
    userStatus: userStatusReducer,
    applicantInfo: applicantInfoReducer
});

export default rootReducer;
