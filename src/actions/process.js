import {
	PROCESS_FETCH_REQUEST,
	PROCESS_FETCH_SUCCESS,
	PROCESS_FETCH_FAIL,
	PROCESS_ADD_REQUEST,
	PROCESS_ADD_SUCCESS,
	PROCESS_ADD_FAIL,
	PROCESS_SEARCH_REQUEST,
	PROCESS_SEARCH_SUCCESS,
	PROCESS_SEARCH_FAIL,
	PROCESS_INFO_REQUEST,
	PROCESS_INFO_SUCCESS,
	PROCESS_INFO_FAIL,
	PROCESS_DIL_INFO_REQUEST,
	PROCESS_DIL_INFO_SUCCESS,
	PROCESS_DIL_INFO_FAIL,
	PROCESS_UNI_INFO_REQUEST,
	PROCESS_UNI_INFO_SUCCESS,
	PROCESS_UNI_INFO_FAIL,
	EDIT_PROCESS_OBS_REQUEST,
	EDIT_PROCESS_OBS_SUCCESS,
	EDIT_PROCESS_OBS_FAIL } from '../actions/actionTypes';

import {API_URL} from '../config/constants'
import axios from 'axios';


export const processFetch = (mail, pwd, status) => {
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
		postData.append("status", status);

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
		postData.append("observacao_unidade", obs_unidade);
		postData.append("id_user", id_user);
		postData.append("id_unidade", id_unidade);


		axios.post(`${API_URL}cadastro`, postData, config)
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

export const processSearch = (id_user, searchterm) => {
	return dispatch => {
		dispatch(processFetchRequest());
		const config = {
		  headers: {
			    "Content-Type": "application/x-www-form-urlencoded",
			  }
		};
		var postData = new FormData();
		postData.append("id_usuario", id_user);
		postData.append("protocolo_processo", searchterm);
		postData.append("numero_processo", searchterm);

		// axios.post(`${API_URL}url`, postData, config)
		axios.post(`${API_URL}busca_processo`, postData, config)
		  .then((response) => {
		  	dispatch(processFetchSuccess(response.data.processes));
		  	console.log(response.data);
		  })
		  .catch((error) => {
		  	dispatch(processFetchFail());
		    console.log(error);
		  });
				  
	}
}
export const fetchProcessInfo = () => {
	return dispatch => {
		dispatch(infoProcessRequest());
		dispatch(infoUniProcessRequest());
		dispatch(infoDilProcessRequest());
		const config = {
		  headers: {
			    "Content-Type": "application/x-www-form-urlencoded",
			  }
		};
		var postData = new FormData();
		postData.append("request", "unidade_judicial");
		axios.post(`${API_URL}info_processo`, postData, config)
		  .then(function (response) {
		  	dispatch(infoUniProcessSuccess(response.data.informacoes));
		  	console.log(response.data);
		  	const config2 = {
			  headers: {
				    "Content-Type": "application/x-www-form-urlencoded",
			  }
			}; 
			var postBody = new FormData();
			postBody.append("request", "classe_diligencia");

			axios.post(`${API_URL}info_processo`, postBody, config2)
			.then(function (finalresponse) {
				dispatch(infoDilProcessSuccess(finalresponse.data.informacoes));
				dispatch(infoProcessSuccess());
		  		console.log(finalresponse.data);
			}).catch(function (error2) {
				dispatch(infoDilProcessFail());
				dispatch(infoProcessFail());
				console.log(error2);
			});

		  })
		  .catch(function (error) {
		  	dispatch(infoUniProcessFail());
		  	dispatch(infoProcessFail());
		    console.log(error);
		  });
				  
	}
}
export const editProcessObs = (id_processo, obs) => {
	return dispatch => {
		dispatch(editProcessObsRequest());
		const config = {
		  headers: {
			    "Content-Type": "application/x-www-form-urlencoded",
			  }
		};
		var postData = new FormData();
		postData.append("id_processo", id_processo);
		postData.append("descricao", obs);

		// axios.post(`${API_URL}url`, postData, config)
		axios.post(`${API_URL}edita_processo`, postData, config)
		  .then((response) => {
		  	dispatch(editProcessObsSuccess(response.data));
		  	console.log(response.data);
		  })
		  .catch((error) => {
		  	dispatch(editProcessObsFail());
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
	type: PROCESS_ADD_REQUEST
});
const addProcessSuccess = () => ({
	type: PROCESS_ADD_SUCCESS,
});
const addProcessFail = () => ({
	type: PROCESS_ADD_FAIL
});
const searchProcessRequest = () => ({
	type: PROCESS_SEARCH_REQUEST
});
const searchProcessSuccess = (data) => ({
	type: PROCESS_SEARCH_SUCCESS,
	payload: data
});
const searchProcessFail = () => ({
	type: PROCESS_SEARCH_FAIL
});
const editProcessObsRequest = () => ({
	type: EDIT_PROCESS_OBS_REQUEST
});
const editProcessObsSuccess = (data) => ({
	type: EDIT_PROCESS_OBS_SUCCESS,
	payload: data
});
const editProcessObsFail = () => ({
	type: EDIT_PROCESS_OBS_FAIL
});
// Info Types
const infoProcessRequest = () => ({
	type: PROCESS_INFO_REQUEST
});
const infoProcessSuccess = (data) => ({
	type: PROCESS_INFO_SUCCESS,
	payload: data
});
const infoProcessFail = () => ({
	type: PROCESS_INFO_FAIL
});
const infoDilProcessRequest = () => ({
	type: PROCESS_DIL_INFO_REQUEST
});
const infoDilProcessSuccess = (data) => ({
	type: PROCESS_DIL_INFO_SUCCESS,
	payload: data
});
const infoDilProcessFail = () => ({
	type: PROCESS_DIL_INFO_FAIL
});
const infoUniProcessRequest = () => ({
	type: PROCESS_UNI_INFO_REQUEST
});
const infoUniProcessSuccess = (data) => ({
	type: PROCESS_UNI_INFO_SUCCESS,
	payload: data
});
const infoUniProcessFail = () => ({
	type: PROCESS_UNI_INFO_FAIL
});