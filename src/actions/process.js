import {
	PROCESS_FETCH_REQUEST,
	PROCESS_FETCH_SUCCESS,
	PROCESS_FETCH_FAIL } from '../actions/actionTypes';

import {API_URL} from '../config/constants'

import axios from 'axios';


export const processFetch = (mail, pwd) => {
	return dispatch => {
		dispatch(processFetchRequest());
		axios.post(`${API_URL}login`, {
			email: 'ggg@ggg.com.br',
			senha: '202cb962ac59075b964b07152d234b70',
			request: 'processes'
		})
		.then(response => {
			if(response.data.mensagem){
				dispatch(processFetchFail());
				console.log(response);	
			} else {
				dispatch(processFetchSuccess(response.data))	
			}
			
		})
		.catch( error => {
			dispatch(processFetchFail());
			console.log(error.request);	
		});
	}
}

const processFetchRequest = () => ({
	type: 'PROCESS_FETCH_REQUEST'
});
const processFetchSuccess = (processes) => ({
	type: 'PROCESS_FETCH_SUCCESS',
	payload: processes
});
const processFetchFail = () => ({
	type: 'PROCESS_FETCH_FAIL'
});