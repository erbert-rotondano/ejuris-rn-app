import { combineReducers } from 'redux';
import companies from './companies';
import auth from './auth';
import userprocess from './process';

export default combineReducers({companies, auth, userprocess});
