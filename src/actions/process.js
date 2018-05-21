import {
	PROCESS_FETCH_REQUEST,
	PROCESS_FETCH_SUCCESS,
	PROCESS_FETCH_FAIL } from '../actions/actionTypes';

import {API_URL} from '../config/constants'
import axios from 'axios';


export const processFetch = (mail, pwd) => {
	return dispatch => {
		dispatch(processFetchRequest());
		const config = {
		  headers: {
			    "Content-Type": "application/x-www-form-urlencoded",
			  }
		};
		var postData = new FormData();
		postData.append("email", mail);
		postData.append("senha", pwd);
		postData.append("request", "processes");

		axios.post(`${API_URL}login`, postData, config)
		  .then(function (response) {
		  	dispatch(processFetchSuccess(response.data.processes));
		  })
		  .catch(function (error) {
		  	dispatch(processFetchFail());
		    console.log(error);
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