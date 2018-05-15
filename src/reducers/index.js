import { combineReducers } from 'redux';
import companies from './companies';
import auth from './auth';
import process from './process';

export default combineReducers({companies, auth, process});
