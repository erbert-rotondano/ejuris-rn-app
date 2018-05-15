import {
	PROCESS_FETCH_SUCCESS,
	PROCESS_FETCH_FAIL,
	PROCESS_FETCH_REQUEST
} from '../actions/actionTypes';

const initialState = {
	process: [],
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
      		return { ...state, process: action.payload, loading: false, loaded: true };
    	case PROCESS_FETCH_FAIL:
      		return { ...state, loading: false, loaded: false };
      	case PROCESS_FETCH_REQUEST:
      		return { ...state, loading: true, loaded: false };
		default:
			return state;
	}
};

export default reducer;