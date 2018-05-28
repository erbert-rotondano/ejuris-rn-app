import {
	PROCESS_FETCH_REQUEST,
	PROCESS_FETCH_SUCCESS,
	PROCESS_FETCH_FAIL,
	PROCESS_ADD_REQUEST,
	PROCESS_ADD_SUCCESS,
	PROCESS_ADD_FAIL } from '../actions/actionTypes';

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
		  	console.log(response.data);
		  	console.log(mail, pwd);
		  })
		  .catch(function (error) {
		  	dispatch(processFetchFail());
		    console.log(error);
		  });
				  
	}
}
export const addProcess = (numero, protocolo, classe_diligencia, obs, cidade, obs_unidade, id_user, id_unidade) => {
	return dispatch => {
		dispatch(addProcessRequest());
		const config = {
		  headers: {
			    "Content-Type": "application/x-www-form-urlencoded",
			  }
		};
		var postData = new FormData();
		postData.append("numero", numero);
		postData.append("protocolo", protocolo);
		postData.append("classe_diligencia", classe_diligencia);
		postData.append("observacao", obs);
		postData.append("cidade", cidade);
		postData.append("observacao_unidade", observacao_unidade);
		postData.append("id_user", id_user);
		postData.append("id_unidade", id_unidade);


		axios.post(`${API_URL}app_cadastro`, postData, config)
		  .then(function (response) {
		  	dispatch(addProcessSuccess());
		  	console.log(response.data);
		  })
		  .catch(function (error) {
		  	dispatch(addProcessFail());
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
const addProcessRequest = () => ({
	type: 'ADD_PROCESS_REQUEST'
});
const addProcessSuccess = () => ({
	type: 'ADD_PROCESS_SUCCESS',
});
const addProcessFail = () => ({
	type: 'ADD_PROCESS_FAIL'
});