import {
	PROCESS_FETCH_REQUEST,
	PROCESS_FETCH_SUCCESS,
	PROCESS_FETCH_FAIL,
	PROCESS_ADD_REQUEST,
	PROCESS_ADD_SUCCESS,
	PROCESS_ADD_FAIL } from '../actions/actionTypes';

const initialState = {
	userprocess: [],
	loaded: false,
	loading: true
};

let http_errors = {
	'error400': 'Informações inválidas',
	'error401': 'Usuário ou senha incorretos.', /* HTTP error 401 - unauthorized */
	'error422': 'Não foi possível processar.', /* HTTP error 422 - unprocessable_entity */
	'error0': 'Serviço indisponível. Tente mais tarde.',
}

const reducer = (state = initialState, action) => {
	switch (action.type){
		case PROCESS_FETCH_SUCCESS:
      		return { ...state, userprocess: action.payload, loading: false, loaded: true };
    	case PROCESS_FETCH_FAIL:
      		return { ...state, loading: false, loaded: false };
      	case PROCESS_FETCH_REQUEST:
      		return { ...state, loading: true, loaded: false };
		case ADD_PROCESS_SUCCESS:
			return { ...state, loading: false, loaded: true };
		case ADD_PROCESS_FAIL:
			return { ...state, loading: false, loaded: false };
		case ADD_PROCESS_REQUEST:
			return { ...state, loading: true, loaded: false };      		
		default:
			return state;
	}
};

export default reducer;