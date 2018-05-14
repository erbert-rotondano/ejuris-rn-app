import {
	LOAD_SPINNER,
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGIN_FAILED,
	SIGNUP_SUCCESS,
	SIGNUP_FAILED,
	SIGNUP_REQUEST,
	LOGOUT_SUCCESS } from '../actions/actionTypes';

const initialState = {
	email: '',
	password: '',
	password_confirmation: '',
	username: '',
	phone: '',
	birthDate: '',
	gender: '',
	area_id: '',
	card_number: '',
	agreement_status: false,
	isFetching: false,
  	isAuthenticated: false,
  	authentication_token: '',
  	error: false,
  	error_status: '',
  	error_message: '',
  	signup_error_message: ''
};

let http_errors = {
	'error400': 'Informações inválidas',
	'error401': 'Usuário ou senha incorretos.', /* HTTP error 401 - unauthorized */
	'error422': 'Não foi possível processar.', /* HTTP error 422 - unprocessable_entity */
	'error0': 'Serviço indisponível. Tente mais tarde.',

	'signuperror401': 'Não foi possível cadastrar. E-mail já utilizado.',
}

const reducer = (state = initialState, action) => {
	switch (action.type){
		case 'EMAIL_CHANGED':
      		return { ...state, email: action.payload };
    	case 'PASSWORD_CHANGED':
      		return { ...state, password: action.payload };
      	case 'PASSWORD_CONFIRMATION_CHANGED':
      		return { ...state, password_confirmation: action.payload };
      	case 'USERNAME_CHANGED':
      		return { ...state, username: action.payload };
      	case 'PHONE_CHANGED':
      		return { ...state, phone: action.payload };
      	case 'BIRTHDATE_CHANGED':
      		return { ...state, birthDate: action.payload };
      	case 'GENDER_CHANGED':
      		return { ...state, gender: action.payload };
      	case 'AGREEMENT_CHANGED':
      		return { ...state, agreement_status: action.payload };
		case LOGIN_REQUEST:
			return {
				...state,
				isFetching: true,
				error: false,
			}
		case LOGIN_SUCCESS:
			return {
				...state,
				...initialState,
				isAuthenticated: true,
				authentication_token: action.authentication_token,
				email: action.email,
				username: action.username,
				area_id: action.area_id+'',
				card_number: action.card_number
			}
		case LOGIN_FAILED:
			return {
				...state,
				...initialState,
				error: true,
				error_status: action.error_status,
				error_message: http_errors['error' + action.error_status],
			}
		case SIGNUP_REQUEST:
			return {
				...state,
				isFetching: true,
				error: false,
			}
		case SIGNUP_SUCCESS:
			return {
				...state,
				...initialState,
				isAuthenticated: true,
				authentication_token: action.authentication_token,
				email: action.email,
				username: action.username,
				area_id: action.area_id+'',
				card_number: action.card_number
			}
		case SIGNUP_FAILED:
			return {
				...state,
				// ...initialState,
				error: true,
				isFetching: false,
				error_status: action.error_status,
				signup_error_message: action.error_status == 401 ? action.error_message : http_errors['signuperror' + action.error_status],
			}
		case LOGOUT_SUCCESS:
			return {
				...state,
				...initialState,
			}
		default:
			return state;
	}
};

console.log()

export default reducer;