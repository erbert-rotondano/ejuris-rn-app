import {
	COMPANY_FETCH_SUCCESS,
	COMPANY_FETCH_FAIL,
	COMPANY_FETCH_REQUEST
} from '../actions/actionTypes';

const initialState = {
	company: {},
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
		case COMPANY_FETCH_SUCCESS:
      		return { ...state, company: action.payload, loading: false, loaded: true };
    	case COMPANY_FETCH_FAIL:
      		return { ...state, loading: false, loaded: false };
      	case COMPANY_FETCH_REQUEST:
      		return { ...state, loading: true, loaded: false };
		default:
			return state;
	}
};

export default reducer;