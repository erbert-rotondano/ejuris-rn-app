import {
	PROCESS_FETCH_REQUEST,
	PROCESS_FETCH_SUCCESS,
	PROCESS_FETCH_FAIL } from '../actions/actionTypes';

import {API_URL} from '../config/constants'

import axios from 'axios';


export const processFetch = () => {
	return dispatch => {
		dispatch(processFetchRequest());
		axios.get(`${API_URL}login`)
		.then(response => {
			dispatch(processFetchSuccess(response.data))
		})
		.catch( => {
			dispatch(processFetchFail())	
		});
	}
}

const processFetchRequest = () => ({
	type: PROCESS_FETCH_REQUEST
});
const processFetchSuccess = (processes) => ({
	type: PROCESS_FETCH_SUCCESS,
	payload: processes
});
const processFetchFail = () => ({
	type: PROCESS_FETCH_FAIL
});