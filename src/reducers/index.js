import { combineReducers } from 'redux';
import companies from './companies';
import auth from './auth';

export default combineReducers({companies, auth});
